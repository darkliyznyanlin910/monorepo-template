module "argocd" {
  source = "../modules/kubernetes/argocd"

  cluster_domain_public = var.cluster_domain_public
  argocd_helm_version   = var.argocd_helm_version
  argocd_helm_extra_values = yamlencode({
    global = {
      hostAliases = [{
        hostnames = [local.registry_host]
        ip        = local.registry_ip
      }]
    },
    configs = {
      tls = {
        certificates = {
          "${local.registry_host}" = tls_self_signed_cert.ca.cert_pem
        }
      },
      secret = {
        argocdServerAdminPassword = "$2a$10$ekZY6VP1UuhNlhQ8.kCNqe5rn94jO4ivz2vzO1slot1X3sNmZmObe" # admin
      }
    },
    server = {
      ingress = {
        enabled = false
      }
    }
  })

  depends_on = [
    module.istio,
  ]
}

resource "kubectl_manifest" "argocd_repo_git" {
  depends_on = [module.argocd]
  yaml_body  = file("${path.root}/values/argocd-repo-git.yaml")
}

resource "kubectl_manifest" "argocd_repo_oci" {
  depends_on = [module.argocd]
  yaml_body  = file("${path.root}/values/argocd-repo-oci.yaml")
}

resource "kubernetes_manifest" "argocd_all_apps" {
  depends_on = [module.argocd]
  manifest = yamldecode(templatefile("${path.root}/../values/argocd-all-apps.yaml", {
    appsets_include = var.argocd_appsets_include
    appsets_path = var.argocd_appsets_path
    repo_url = "file:///mnt/monorepo-template.git"
  }))
}

resource "kubernetes_manifest" "argocd_projects" {
  depends_on = [module.argocd]
  manifest = yamldecode(file("${path.root}/../values/argocd-projects.yaml"))
}