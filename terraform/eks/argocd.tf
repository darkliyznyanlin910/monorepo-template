module "argocd" {
  source = "../modules/kubernetes/argocd"

  cluster_domain_public = var.cluster_domain_public
  argocd_helm_version   = var.argocd_helm_version
  argocd_helm_extra_values = yamlencode({
  })
}

resource "kubectl_manifest" "argocd_repo_git" {
  depends_on = [module.argocd]
  yaml_body  = templatefile("${path.root}/../values/argocd-repo-git.yaml", {
    repo_url = var.argocd_repo_url
    repo_username = var.argocd_repo_username
    repo_password = var.argocd_repo_password
  })
}

resource "kubectl_manifest" "argocd_repo_oci" {
  depends_on = [module.argocd]
  yaml_body  = file("${path.root}/../values/argocd-repo-oci.yaml")
}

resource "kubernetes_manifest" "argocd_all_apps" {
  depends_on = [module.argocd]
  manifest = yamldecode(templatefile("${path.root}/../values/argocd-all-apps.yaml", {
    appsets_include = var.argocd_appsets_include
    appsets_path = var.argocd_appsets_path
    repo_url = var.argocd_repo_url
  }))
}

resource "kubernetes_manifest" "argocd_projects" {
  depends_on = [module.argocd]
  manifest = yamldecode(file("${path.root}/../values/argocd-projects.yaml"))
}