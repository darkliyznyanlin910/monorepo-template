# helm repo add istio https://istio-release.storage.googleapis.com/charts
# helm repo update
# helm install gateway -n istio-ingress --create-namespace istio/gateway

# important note: this creates a load balancer that will NOT be tracked by terraform
# since this load balancer is provisioned by kubernetes and not terraform, it will not be managed by terraform
# thus to delete it, you must delete it manually (using the script)
resource "helm_release" "gateway" {
  name = "${var.cluster_name}-istio-gateway"

  repository       = "https://istio-release.storage.googleapis.com/charts"
  chart            = "gateway"
  namespace        = "istio-ingress"
  create_namespace = true
  version          = "1.21.0"

  # set the name of the service to be "istio-ingressgateway"
  set {
    name  = "service.name"
    value = "istio-ingressgateway"
  }

  # have the gateway be a network load balancer instead of a classic one
  set {
    name  = "service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-type"
    value = "nlb"
  }

  depends_on = [
    helm_release.istio_base,
    helm_release.istiod
  ]

}

// Output of our load balancer ingress hostname.
# output "load_balancer_ingress" {
#   description = "The hostname of the load balancer ingress created by the Istio gateway"
#   value       = "Your method to fetch the hostname"
# }

resource "time_sleep" "wait_for_ingressgateway" {
  depends_on = [helm_release.gateway]

  create_duration = "60s"
}

data "kubernetes_service" "istio_ingressgateway" {
  metadata {
    name      = "${var.cluster_name}-istio-gateway"
    namespace = "istio-ingress"
  }

  depends_on = [time_sleep.wait_for_ingressgateway]
}

resource "aws_route53_record" "istio_nlb_dns" {
  zone_id = var.hosted_zone_id
  name    = "*.${var.cluster_domain_public}"
  type    = "A"

  alias {
    name                   = data.kubernetes_service.istio_ingressgateway.status.0.load_balancer.0.ingress.0.hostname
    zone_id                = var.nlb_zone_id
    evaluate_target_health = true
  }

  depends_on = [helm_release.gateway]
}
