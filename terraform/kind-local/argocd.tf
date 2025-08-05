module "argocd" {
  source = "../modules/kubernetes/argocd"

  cluster_domain_public = var.cluster_domain_public
  argocd_helm_version   = var.argocd_helm_version
  argocd_appsets_include = var.argocd_appsets_include
  argocd_repo_url = "file:///mnt/voltade-os.git"
  argocd_appsets_path = var.argocd_appsets_path
}

resource "kubectl_manifest" "argocd_repo_git" {
  depends_on = [module.argocd]
  yaml_body  = file("${path.module}/argocd-repo-git.yaml")
}

resource "kubectl_manifest" "argocd_repo_oci" {
  depends_on = [module.argocd]
  yaml_body  = file("${path.module}/argocd-repo-oci.yaml")
}