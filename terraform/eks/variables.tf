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
  default     = "8.2.5"
}

variable "argocd_appsets_include" {
  type        = string
  description = "ArgoCD appsets to include"
  nullable    = false
}

variable "argocd_appsets_path" {
  type        = string
  description = "The path to the appsets in the Git repository"
  nullable    = false
}

variable "argocd_repo_url" {
  type        = string
  description = "The URL of the Git repository to configure for ArgoCD"
  nullable    = false
}

variable "argocd_repo_username" {
  type        = string
  description = "The username for the Git repository"
  nullable    = false
}

variable "argocd_repo_password" {
  type        = string
  description = "The password for the Git repository"
  nullable    = false
}