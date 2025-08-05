# Istio CNI plugin for environments that disable default CNI (e.g., kind)
resource "helm_release" "istio_cni" {
  count = var.enable_cni ? 1 : 0
  
  name = "${var.cluster_name}-istio-cni"

  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "cni"
  namespace  = "istio-system"
  version    = var.istio_cni_helm_version

  values = [
    yamlencode({
      global = {
        istioNamespace = "istio-system"
      }
      cni = {
        chained = false
        cniBinDir = "/opt/cni/bin"
        cniConfDir = "/etc/cni/net.d"
      }
    })
  ]

  depends_on = [helm_release.istio_base]
}