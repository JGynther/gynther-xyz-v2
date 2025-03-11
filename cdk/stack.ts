import { App, CfnOutput, Stack } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  CachePolicy,
  Distribution,
  HttpVersion,
  ResponseHeadersPolicy,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

class StaticWebsite extends Stack {
  constructor(context: App, id: string, certificateArn: string) {
    super(context, id);

    const websiteBucket = new Bucket(this, "websiteBucket");

    // prettier-ignore
    const certificate = Certificate.fromCertificateArn(this, "certificate", certificateArn);

    const cloudfront = new Distribution(this, "cloudfront", {
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(websiteBucket),
        responseHeadersPolicy: ResponseHeadersPolicy.SECURITY_HEADERS,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
        compress: true,
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
      httpVersion: HttpVersion.HTTP2_AND_3,
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
