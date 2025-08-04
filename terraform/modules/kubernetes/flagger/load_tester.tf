resource "helm_release" "loadtester" {
  name = "loadtester"

  repository       = "https://flagger.app"
  chart            = "loadtester"
  namespace        = "istio-system"
  create_namespace = false
  version          = var.loadtester_helm_version
}