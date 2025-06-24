resource "aws_route53_record" "istio_nlb_dns" {
  zone_id = var.hosted_zone_id
  name    = "*.${var.cluster_domain_public}"
  type    = "A"

  alias {
    name                   = data.kubernetes_service.istio_ingressgateway.load_balancer_ingress[0].hostname
    zone_id                = var.nlb_zone_id
    evaluate_target_health = true
  }
}
