# helm repo add istio https://istio-release.storage.googleapis.com/charts
# helm repo update
# helm install gateway -n istio-system --create-namespace istio/gateway

resource "helm_release" "grafana_gateway" {
  name = "${var.cluster_name}-istio-grafana-gateway"

  repository       = "https://istio-release.storage.googleapis.com/charts"
  chart            = "gateway"
  namespace        = "istio-system"
  create_namespace = true
  version          = var.istio_gateway_helm_version

  values = [
    {
      service = {
        name = "istio-grafana-gateway"
        annotations = var.aws ? {
          "service.beta.kubernetes.io/aws-load-balancer-type" = "nlb"
        } : {}
      }
    }
  ]

  depends_on = [
    helm_release.istio_base,
    helm_release.istiod
  ]
}
