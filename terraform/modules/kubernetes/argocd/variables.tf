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

variable "argocd_repositories" {
  type = list(object({
    name                    = string
    repo_name              = string
    url                    = string
    username = string
    password = string
  }))
  description = "List of Git repositories to configure for ArgoCD"
  default     = []
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