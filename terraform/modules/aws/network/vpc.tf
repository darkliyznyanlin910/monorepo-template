#tfsec:ignore:aws-ec2-require-vpc-flow-logs-for-all-vpcs
resource "aws_vpc" "vpc" {
  #checkov:skip=CKV2_AWS_11:VPC flow logging is intentionally not enabled for specific VPCs
  #checkov:skip=CKV2_AWS_12:Security group configuration temporarily set to default
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "itsa-singapore-vpc"
  }
}