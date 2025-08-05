variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "cluster_domain_public" {
  description = "Cluster domain for public access"
  type        = string
}

variable "aws" {
  description = "AWS provider"
  type = bool
  default = false
}

variable "istio_gateway_helm_version" {
  type = string
  default = "1.21.0"
}

variable "istiod_helm_version" {
  type = string
  default = "1.21.0"
}

variable "istio_base_helm_version" {
  type = string
  default = "1.21.0"
}