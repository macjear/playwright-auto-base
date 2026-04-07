/**
 * AwsBatchUtil — Placeholder for AWS Batch job submission.
 * Replace with actual @aws-sdk/client-batch calls when configured.
 */
export class AwsBatchUtil {
  constructor(private readonly jobQueue: string, private readonly jobDefinition: string) {}

  async submitJob(jobName: string, parameters?: Record<string, string>): Promise<string> {
    // TODO: implement with @aws-sdk/client-batch
    throw new Error(
      `AwsBatchUtil.submitJob not implemented. Would submit job "${jobName}" to queue "${this.jobQueue}"`
    );
  }

  async waitForJobCompletion(jobId: string, pollIntervalMs = 30_000): Promise<void> {
    // TODO: implement polling logic with @aws-sdk/client-batch
    throw new Error(`AwsBatchUtil.waitForJobCompletion not implemented for job "${jobId}"`);
  }
}
