import { App } from "aws-cdk-lib";
import { StaticWebsite } from "./stack";

import findACMCertificate from "@lib/findACMCertificate";

const arn = await findACMCertificate("gynther.xyz");

const app = new App();
new StaticWebsite(app, "website", arn);
