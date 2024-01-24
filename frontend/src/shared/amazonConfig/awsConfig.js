import { S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
const awsConfig = {
  region: " us-east-1", // Replace with your AWS region, e.g., "us-east-1"
  credentials: {
    accessKeyId: process.env.AK
    secretAccessKey: process.env.SAK,
  },
};

const client = new S3Client(awsConfig);
export default client;