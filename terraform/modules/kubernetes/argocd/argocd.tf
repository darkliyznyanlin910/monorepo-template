resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  version          = var.argocd_helm_version
  namespace        = "argocd"
  create_namespace = true
  # https://github.com/argoproj/argo-helm/blob/main/charts/argo-cd/values.yaml
  values = [
    file("${path.module}/values/argocd.values.yaml"),
    yamlencode({
      global = {
        domain = "argocd.${var.cluster_domain_public}"
      }
    })
  ]
}

resource "kubernetes_manifest" "argocd_all_apps" {
  depends_on = [helm_release.argocd]
  manifest = templatefile("${path.module}/values/argocd-all-apps.yaml", {
    appsets_include = var.argocd_appsets_include
    appsets_path = var.argocd_appsets_path
    repo_url = var.argocd_repo_url
  })
}

resource "kubernetes_manifest" "argocd_projects" {
  depends_on = [helm_release.argocd]
  manifest = file("${path.module}/values/argocd-projects.yaml")
}

resource "kubectl_manifest" "argocd_appsets" {
  depends_on = [helm_release.argocd]
  yaml_body = templatefile("${path.module}/argocd-appsets.yaml", {
    appsets_include = var.argocd_appsets_include
  })
}