variable "cluster_domain_public" {
  type        = string
  description = "The public domain for the cluster"
}

variable "argocd_helm_version" {
  type        = string
  description = "The version of ArgoCD Helm chart to install"
}

variable "argocd_appsets_include" {
  type        = string
  description = "The appsets to include in the ArgoCD project"
}

variable "argocd_repo_url" {
  type        = string
  description = "The URL of the Git repository to configure for ArgoCD"
  nullable    = false
}

variable "argocd_appsets_path" {
  type        = string
  description = "The path to the appsets in the Git repository"
  nullable    = false
}

variable "argocd_helm_values" {
  type        = string
  description = "The values to pass to the ArgoCD Helm chart in yaml string format"
  nullable    = false
}