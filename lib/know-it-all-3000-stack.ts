import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
export class KnowItAll3000Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const discordInteractions = new lambda.Function(this, "Interaction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "interactions.handler",
    });

    const api = new apigateway.LambdaRestApi(this, "DiscordApi", {
      handler: discordInteractions,
      proxy: false,
    });

    const interact = api.root.addResource('interactions');
    interact.addMethod('GET')
  }
}
