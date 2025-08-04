output "istio_ingressgateway_hostname" {
  value = data.kubernetes_service.istio_ingressgateway.status.0.load_balancer.0.ingress.0.hostname
  
  depends_on = [helm_release.gateway]
}