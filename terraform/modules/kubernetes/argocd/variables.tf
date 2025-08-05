variable "cluster_domain_public" {
  type        = string
  description = "The public domain for the cluster"
}

variable "argocd_helm_version" {
  type        = string
  description = "The version of ArgoCD Helm chart to install"
}

variable "argocd_helm_extra_values" {
  type        = string
  description = "The values to pass to the ArgoCD Helm chart in yaml string format"
  nullable = true
}