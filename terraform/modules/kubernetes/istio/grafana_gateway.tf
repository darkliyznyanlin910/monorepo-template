# helm repo add istio https://istio-release.storage.googleapis.com/charts
# helm repo update
# helm install gateway -n istio-system --create-namespace istio/gateway

resource "helm_release" "grafana_gateway" {
  name = "${var.cluster_name}-istio-grafana-gateway"

  repository       = "https://istio-release.storage.googleapis.com/charts"
  chart            = "gateway"
  namespace        = "istio-system"
  create_namespace = true
  version          = "1.21.0"

  # Set the name of the service to be "istio-grafana-gateway"
  set {
    name  = "service.name"
    value = "istio-grafana-gateway"
  }

  #  Deploy as a network load balancer
  set {
    name  = "service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-type"
    value = "nlb"
  }

  depends_on = [
    helm_release.istio_base,
    helm_release.istiod
  ]

}
