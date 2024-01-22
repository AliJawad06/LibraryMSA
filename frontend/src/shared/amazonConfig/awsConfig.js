import { S3Client } from "@aws-sdk/client-s3";

const awsConfig = {
  region: " us-east-1", // Replace with your AWS region, e.g., "us-east-1"
  credentials: {
    accessKeyId: "AKIAQWDAFY3PXHSMVGWI",
    secretAccessKey: "FbJfIRiCtUw+nom4l8fLUaZ0/mlWL2/bFMikDIEa",
  },
};

const s3Client = new S3Client(awsConfig);

export default s3Client;