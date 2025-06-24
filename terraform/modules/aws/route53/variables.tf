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
}