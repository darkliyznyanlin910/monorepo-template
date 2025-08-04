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

# https://artifacthub.io/packages/helm/cilium/cilium
variable "cilium_version" {
  type    = string
  default = "1.18.0"
}

# https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/#prerequisites
variable "gateway_api_version" {
  type    = string
  default = "v1.3.0"
}

# https://artifacthub.io/packages/helm/traefik/traefik
variable "traefik_helm_version" {
  type    = string
  default = "37.0.0"
}