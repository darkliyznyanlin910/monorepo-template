variable "cluster_name" {
  type        = string
  description = "Cluster name"
}

variable "cluster_domain_public" {
  type        = string
  description = "Public domain for the cluster"
}

variable "argocd_helm_version" {
  type        = string
  description = "ArgoCD Helm version"
  default = "8.2.5"
}

variable "argocd_appsets_include" {
  type        = string
  description = "ArgoCD appsets to include"
}

# https://hub.docker.com/r/kindest/node/tags
variable "kubernetes_version" {
  type    = string
  default = "v1.33.2"
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