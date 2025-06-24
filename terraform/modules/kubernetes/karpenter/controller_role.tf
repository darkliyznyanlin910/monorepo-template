data "aws_iam_policy_document" "itsa_karpenter_controller_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    condition {
      test     = "StringEquals"
      variable = "${replace(var.itsa_singapore_eks_oidc_url, "https://", "")}:sub"
      values   = ["system:serviceaccount:karpenter:karpenter"]
    }

    principals {
      identifiers = [var.itsa_singapore_eks_oidc_arn]
      type        = "Federated"
    }
  }
}

resource "aws_iam_role" "itsa_karpenter_controller_role" {
  assume_role_policy = data.aws_iam_policy_document.itsa_karpenter_controller_assume_role_policy.json
  name               = "karpenter-controller"
}

resource "aws_iam_policy" "itsa_karpenter_controller_policy" {
  policy = file("./modules/kubernetes/karpenter/controller_trust_policy.json")
  name   = "KarpenterController"
}

resource "aws_iam_role_policy_attachment" "aws_load_balancer_controller_attach" {
  role       = aws_iam_role.itsa_karpenter_controller_role.name
  policy_arn = aws_iam_policy.itsa_karpenter_controller_policy.arn
}

resource "aws_iam_instance_profile" "itsa_karpenter_profile" {
  name = "KarpenterNodeInstanceProfile"
  role = var.itsa_eks_nodes_role_name
}
