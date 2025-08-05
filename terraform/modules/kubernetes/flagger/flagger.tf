resource "helm_release" "flagger" {
  name = "flagger"

  repository       = "https://flagger.app"
  chart            = "flagger"
  namespace        = "istio-system"
  create_namespace = false
  version          = var.flagger_helm_version

  values = [
    yamlencode({
      crd = {
        create = false
      }
      meshProvider = "istio"
      metricsServer = "http://prometheus-operated.metrics:9090"
    })
  ]
}