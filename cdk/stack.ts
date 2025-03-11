import { App, Stack, CfnOutput } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

class StaticWebsite extends Stack {
  constructor(context: App, id: string, certificateArn: string) {
    super(context, id);

    const websiteBucket = new Bucket(this, "websiteBucket");

    // prettier-ignore
    const certificate = Certificate.fromCertificateArn(this, "certificate", certificateArn);

    const cloudfront = new Distribution(this, "cloudfront", {
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(websiteBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
      domainNames: ["gynther.xyz"],
      certificate,
    });

    new CfnOutput(this, "Cloudfront URL", { value: cloudfront.domainName });

    new BucketDeployment(this, "deployment", {
      destinationBucket: websiteBucket,
      sources: [Source.asset("dist")],
      distribution: cloudfront,
      prune: true,
      exclude: [".DS_Store"],
    });
  }
}

export { StaticWebsite };
