variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "hosted_zone_id" {
  description = "Hosted zone ID for the cluster"
  type        = string
}

variable "cluster_domain_public" {
  description = "Cluster domain for public access"
  type        = string
}

variable "nlb_zone_id" {
  description = "NLB zone ID"
  type        = string
}