# Define an AWS EKS Cluster resource
# tfsec:ignore:aws-eks-no-public-cluster-access
# tfsec:ignore:aws-eks-no-public-cluster-access-to-cidr
resource "aws_eks_cluster" "eks_cluster" {
  name     = var.cluster_name

  #checkov:skip=CKV_AWS_339: Newest version as specified by AWS
  version = "1.29"

  # ARN of the IAM role that the EKS cluster will assume
  role_arn = aws_iam_role.eks_cluster_role.arn

  # Configure encryption for Kubernetes secrets using KMS
  encryption_config {
    resources = [ "secrets" ]
    provider {
        key_arn = var.eks_kms_key_arn
    }
  }
  # Configuration related to the VPC
  #checkov:skip=CKV_AWS_38: To enable kubectl access to the cluster, the public access is required
  #checkov:skip=CKV_AWS_39: To enable kubectl access to the cluster, the public access is required
  vpc_config {
    
    subnet_ids = concat(var.private_subnet_ids, var.public_subnet_ids)

    # # Disable public and enable private access to the EKS Kubernetes API server
    # endpoint_public_access = false
    # endpoint_private_access = true
  }

  # Enable logging for the EKS cluster. Types include API server, authenticator, etc.
  enabled_cluster_log_types = ["api", "authenticator", "audit", "scheduler", "controllerManager"]

  # Ensure that the IAM role policy attachment is created before the EKS cluster
  depends_on = [aws_iam_role_policy_attachment.itsa_eks_cluster_AmazonEKSClusterPolicy]
}

# create an authentication token to communicate with the EKS Cluster
# this token is used by kubectl to communicate with the EKS cluster
data "aws_eks_cluster_auth" "eks_cluster_auth" {
  name = aws_eks_cluster.eks_cluster.name
}