import { S3Client } from "@aws-sdk/client-s3";

const awsConfig = {
  credentials: {
    accessKeyId: process.env.REACT_APP_AK,
    secretAccessKey: process.env.REACT_APP_SAK,
  },
  region: "us-east-1", // Replace with your AWS region, e.g., "us-east-1"
};

const client = new S3Client(awsConfig);
export default client;