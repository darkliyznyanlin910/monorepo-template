module "network" {
  source = "../modules/aws/network"
  cluster_name = var.cluster_name
}

module "kms" {
  source = "../modules/aws/kms"
}

module "eks" {
  source = "../modules/aws/eks"
  cluster_name = var.cluster_name
  private_subnet_ids = module.network.private_subnet_ids
  public_subnet_ids  = module.network.public_subnet_ids
  eks_kms_key_arn    = module.kms.eks_kms_key_arn
}

module "kubernetes" {
  source = "../modules/kubernetes"

  # for IAM to access EKS
  eks_nodes_role_arn = module.eks.eks_nodes_role_arn
  aws_account_id          = var.aws_account_id
  iam_user_name           = var.iam_user_name
}

module "karpenter" {
  source = "../modules/kubernetes/karpenter"

  eks_oidc_url = module.eks.eks_oidc_url
  eks_oidc_arn = module.eks.eks_oidc_arn
  eks_nodes_role_name    = module.eks.eks_nodes_role_name

  eks_cluster_id       = module.eks.eks_cluster_id
  eks_cluster_endpoint = module.eks.eks_cluster_endpoint
}

module "argocd" {
  source = "../modules/kubernetes/argocd"

  cluster_domain_public = var.cluster_domain_public
  argocd_helm_version   = var.argocd_helm_version
  argocd_appsets_include = var.argocd_appsets_include
}

module "istio" {
  source = "../modules/kubernetes/istio"
  cluster_name = var.cluster_name
}

module "metrics_server" {
  source = "../modules/kubernetes/metrics_server"
}

module "flagger" {
  source = "../modules/kubernetes/flagger"
}

module "operations" {
  source = "../modules/kubernetes/operations"
}

# DEPLOY MANUALLY after getting the NLB zone ID
# module "route53" {
#   source = "../modules/aws/route53"

#   cluster_domain_public = var.cluster_domain_public
#   hosted_zone_id        = var.hosted_zone_id
#   nlb_zone_id           = var.nlb_zone_id
# }