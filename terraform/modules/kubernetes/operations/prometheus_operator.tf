resource "helm_release" "prometheus_operator" {
  name = "prometheus-operator-release"

  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "kube-prometheus-stack"
  namespace        = "metrics"
  create_namespace = true

  # overwrite values
  values = [file("${path.module}/values/custom_config.yaml")]
}