resource "kubernetes_config_map" "aws_auth" {
  metadata {
    name      = "aws-auth"
    namespace = "kube-system"
  }

  data = {
    mapRoles = yamlencode([
      {
        # this allows the worker nodes to join the cluster
        rolearn  = var.itsa_eks_nodes_role_arn
        username = "system:node:{{EC2PrivateDNSName}}"
        groups   = ["system:bootstrappers", "system:nodes"]
      },
      {
        # maps IAM user for kubectl access
        rolearn = "arn:aws:iam::${var.aws_account_id}:user/${var.iam_user_name}"
        username = "${var.iam_user_name}"
        groups = ["system:masters"]
      }
    ])
  }
}
