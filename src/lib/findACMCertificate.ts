import { ACMClient, ListCertificatesCommand } from "@aws-sdk/client-acm";
import assert from "node:assert";

const client = new ACMClient({ region: "us-east-1" });

const findACMCertificate = async (domain: string) => {
  const command = new ListCertificatesCommand();
  const response = await client.send(command);

  assert(response.CertificateSummaryList);

  const match = response.CertificateSummaryList.filter(
    (c) => c.DomainName === domain
  );

  assert(match.length === 1);
  assert(match[0].CertificateArn);

  return match[0].CertificateArn;
};

export default findACMCertificate;
