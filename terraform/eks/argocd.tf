module "argocd" {
  source = "../modules/kubernetes/argocd"

  cluster_domain_public = var.cluster_domain_public
  argocd_helm_version   = var.argocd_helm_version
  argocd_appsets_include = var.argocd_appsets_include
  argocd_repo_url = var.argocd_repo_url
  argocd_appsets_path = var.argocd_appsets_path
}

resource "kubectl_manifest" "argocd_repo_git" {
  depends_on = [module.argocd]
  yaml_body  = templatefile("${path.module}/argocd-repo-git.yaml", {
    repo_url = var.argocd_repo_url
    repo_username = var.argocd_repo_username
    repo_password = var.argocd_repo_password
  })
}

resource "kubectl_manifest" "argocd_repo_oci" {
  depends_on = [module.argocd]
  yaml_body  = file("${path.module}/argocd-repo-oci.yaml")
}

resource "kubectl_manifest" "argocd_appsets" {
  depends_on = [module.argocd]
  yaml_body = templatefile("${path.module}/argocd-appsets.yaml", {
    appsets_include = var.argocd_appsets_include
  })
}