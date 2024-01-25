import { S3Client } from "@aws-sdk/client-s3";
const awsConfig = {
  region: " us-east-1", // Replace with your AWS region, e.g., "us-east-1"
  credentials: {
    accessKeyId: process.env.REACT_APP_AK,
    secretAccessKey: process.env.REACT_APP_SAK
  },
};

const client = new S3Client(awsConfig);
export default client;