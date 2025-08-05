module "istio" {
  source = "../modules/kubernetes/istio"
  cluster_name = var.cluster_name
  cluster_domain_public = var.cluster_domain_public
  aws = false
}