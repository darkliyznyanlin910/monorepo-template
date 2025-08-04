module "istio" {
  source = "../modules/kubernetes/istio"
  cluster_name = var.cluster_name
  cluster_domain_public = var.cluster_domain_public
  hosted_zone_id = var.hosted_zone_id
  nlb_zone_id = var.nlb_zone_id
}

resource "aws_route53_record" "istio_nlb_dns" {
  zone_id = var.hosted_zone_id
  name    = "*.${var.cluster_domain_public}"
  type    = "A"

  alias {
    name                   = module.istio.istio_ingressgateway_hostname
    zone_id                = var.nlb_zone_id
    evaluate_target_health = true
  }

  depends_on = [module.istio]
}