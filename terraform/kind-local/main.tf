module "argocd" {
  source = "../modules/kubernetes/argocd"

  cluster_domain_public = var.cluster_domain_public

  argocd_helm_version = var.argocd_helm_version
  argocd_appsets_include = var.argocd_appsets_include
  argocd_repositories = var.argocd_repositories
  argocd_repo_url = var.argocd_repo_url
  argocd_appsets_path = var.argocd_appsets_path
}