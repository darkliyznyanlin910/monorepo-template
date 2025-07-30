variable "aws_account_id" {
  type        = string
  description = "AWS account ID"
}

variable "cluster_name" {
  type        = string
  description = "Cluster name"
}

variable "aws_profile" {
  type        = string
  description = "AWS profile"
}

variable "iam_user_name" {
  type        = string
  description = "IAM user name"
}

variable "cluster_domain_public" {
  type        = string
  description = "Public domain for the cluster"
}

variable "hosted_zone_id" {
  type        = string
  description = "Route53 zone ID"
}

variable "nlb_zone_id" {
  type        = string
  description = "Route53 zone ID for the NLB"
  default     = null
}

variable "argocd_helm_version" {
  type        = string
  description = "ArgoCD Helm version"
}

variable "argocd_appsets_include" {
  type        = string
  description = "ArgoCD appsets to include"
}