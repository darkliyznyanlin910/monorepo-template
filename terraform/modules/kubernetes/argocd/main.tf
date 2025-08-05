resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  version          = var.argocd_helm_version
  namespace        = "argocd"
  create_namespace = true
  # https://github.com/argoproj/argo-helm/blob/main/charts/argo-cd/values.yaml
  values = [
    file("${path.module}/values/argocd.values.yaml"),
    yamlencode({
      global = {
        domain = "argocd.${var.cluster_domain_public}"
      }
    }),
    var.argocd_helm_extra_values
  ]
}