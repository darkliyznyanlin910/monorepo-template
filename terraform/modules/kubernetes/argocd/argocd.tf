resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  version          = var.argocd_helm_version
  namespace        = "argocd"
  create_namespace = true
  values = [
    file("${path.module}/values/argocd.values.yaml")
  ]
  # https://github.com/argoproj/argo-helm/blob/main/charts/argo-cd/values.yaml
  set {
    name  = "global.domain"
    value = "argocd.${var.cluster_domain_public}"
  }
}

resource "kubernetes_manifest" "argocd_repositories" {
  depends_on = [helm_release.argocd]
  for_each   = { for repo in var.argocd_repositories : repo.name => repo }

  manifest = {
    apiVersion = "v1"
    kind = "Secret"
    metadata = {
      name = each.value.name
      namespace = "argocd"
      labels = {
        "argocd.argoproj.io/secret-type" = "repository"
      }
      annotations = {
        "managed-by" = "argocd.argoproj.io"
      }
    }
    type = "Opaque"
    stringData = {
      type = "git"
      name = each.value.repo_name
      url = each.value.url
      username = each.value.username
      password = each.value.password
    }
  }
}

resource "kubernetes_manifest" "argocd_all_apps" {
  depends_on = [helm_release.argocd]
  manifest = templatefile("${path.module}/values/argocd-all-apps.yaml", {
    appsets_include = var.argocd_appsets_include
  })
}

resource "kubernetes_manifest" "argocd_projects" {
  depends_on = [helm_release.argocd]
  manifest = file("${path.module}/values/argocd-projects.yaml")
}
