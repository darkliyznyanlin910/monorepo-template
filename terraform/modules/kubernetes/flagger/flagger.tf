resource "helm_release" "flagger" {
  name = "flagger"

  repository       = "https://flagger.app"
  chart            = "flagger"
  namespace        = "istio-system"
  create_namespace = false
  version          = "1.36.1"

  values = [
    {
      crd = {
        create = false
      }
      meshProvider = "istio"
      metricsServer = "http://prometheus-operated.metrics:9090"
    }
  ]
}