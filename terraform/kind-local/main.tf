module "istio" {
  source = "../modules/kubernetes/istio"
  cluster_name = var.cluster_name
  cluster_domain_public = var.cluster_domain_public
  aws = false
  enable_cni = true

  depends_on = [kind_cluster.this]
}

module "metrics_server" {
  source = "../modules/kubernetes/metrics_server"

  depends_on = [kind_cluster.this]
}

module "flagger" {
  source = "../modules/kubernetes/flagger"

  depends_on = [kind_cluster.this]
}

module "operations" {
  source = "../modules/kubernetes/operations"

  depends_on = [kind_cluster.this]
}