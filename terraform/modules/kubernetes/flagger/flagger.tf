resource "helm_release" "flagger" {
  name = "flagger"

  repository       = "https://flagger.app"
  chart            = "flagger"
  namespace        = "istio-system"
  create_namespace = false
  version          = "1.36.1"

  set {
    name  = "crd.create"
    value = "false"
  }

  set {
    name  = "meshProvider"
    value = "istio"
  }

  set {
    name  = "metricsServer"
    value = "http://prometheus-operated.metrics:9090"
  }
}