# deploying karpenter using helm
resource "helm_release" "karpenter" {
  namespace        = "karpenter"
  create_namespace = true

  name       = "karpenter"
  repository = "https://charts.karpenter.sh"
  chart      = "karpenter"
  version    = "v0.16.3"

  # provides karpenter permissions to manage nodes
  set {
    name  = "serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = aws_iam_role.karpenter_controller_role.arn
  }

  set {
    name  = "clusterName"
    value = var.eks_cluster_id
  }

  set {
    name  = "clusterEndpoint"
    value = var.eks_cluster_endpoint
  }

  # provides EC2 instances permissions upon launching
  set {
    name  = "aws.defaultInstanceProfile"
    value = aws_iam_instance_profile.karpenter_profile.name
  }

}
