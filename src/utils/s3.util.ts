/**
 * S3Util — Placeholder for AWS S3 operations.
 * Replace with actual AWS SDK calls when credentials are configured.
 */
export class S3Util {
  private readonly bucket: string;

  constructor(bucket: string) {
    this.bucket = bucket;
  }

  async upload(key: string, body: Buffer | string): Promise<string> {
    // TODO: implement with @aws-sdk/client-s3
    throw new Error(`S3Util.upload not implemented. Would upload to s3://${this.bucket}/${key}`);
  }

  async download(key: string): Promise<Buffer> {
    // TODO: implement with @aws-sdk/client-s3
    throw new Error(`S3Util.download not implemented. Would download s3://${this.bucket}/${key}`);
  }

  async exists(key: string): Promise<boolean> {
    // TODO: implement with @aws-sdk/client-s3
    throw new Error(`S3Util.exists not implemented. Would check s3://${this.bucket}/${key}`);
  }
}
