import * as cdk from 'aws-cdk-lib';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { 
  InstanceClass, 
  MachineImage, 
  Vpc, 
  SecurityGroup, 
  Peer, 
  Port, 
  Instance, 
  InstanceType,
  InstanceSize
} from 'aws-cdk-lib/aws-ec2';

const HTTP_PORT: number = 80;;
const HTTPS_PORT: number = 443;

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = Vpc.fromLookup(this, 'VPC', { isDefault: true });

    const role = new Role(this, 'brishack-server-role', {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com')
    });

    const securityGroup = new SecurityGroup(this, 'brishack-security-group', {
      vpc,
      allowAllOutbound: true,
      securityGroupName: 'brishack-security-group'
    });

    // Allow inbound HTTP and HTTPS connections
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(HTTP_PORT));
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(HTTPS_PORT));

    const serverInstance = new Instance(this, 'brishack-server-instance', {
      vpc: vpc,
      role: role,
      securityGroup: securityGroup,
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
      machineImage: MachineImage.latestAmazonLinux2023()
    });

  }
}
