import { S3Client } from '@aws-sdk/client-s3';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

/**
 * S3Connection — singleton AWS S3 client using the default credentials provider chain.
 *
 * Required environment variables:
 *   AWS_AC_REGION — AWS region (e.g. us-east-1)
 *
 * Credentials are resolved automatically via the default provider chain
 * (environment variables → shared credentials file → IAM role).
 */
export class S3Connection {
  private static client: S3Client | null = null;

  private constructor() {}

  private static connectToS3(): S3Client {
    const region = process.env.AWS_AC_REGION;
    return new S3Client({
      region,
      credentials: fromNodeProviderChain(),
    });
  }

  /**
   * Returns the singleton S3Client, creating it on first call.
   * Node.js is single-threaded so no additional locking is required.
   *
   * @returns S3Client
   */
  static getClient(): S3Client {
    if (!S3Connection.client) {
      S3Connection.client = S3Connection.connectToS3();
    }
    return S3Connection.client;
  }
}
