import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { fromIni, fromNodeProviderChain, fromTemporaryCredentials } from '@aws-sdk/credential-providers';

/**
 * DynamoDBConnection — singleton DynamoDB client with optional IAM role assumption.
 *
 * Required environment variables:
 *   AWS_LOGIN_TYPE        — "role" to assume an IAM role, any other value uses the default chain
 *   AWS_ACCOUNT_ID        — AWS account ID used to build the role ARN
 *   AWS_CURRENT_ROLE      — IAM role name appended to the ARN (only when AWS_LOGIN_TYPE=role)
 *   AWS_SESSION_NAME      — STS session name (only when AWS_LOGIN_TYPE=role)
 *   DYNAMODB_AC_ENDPOINT  — DynamoDB endpoint URL
 *   AWS_AC_REGION         — AWS region (e.g. us-east-1)
 */
export class DynamoDBConnection {
  private static client: DynamoDBClient | null = null;
  private static docClient: DynamoDBDocumentClient | null = null;

  private constructor() {}

  private static connectDynamoDB(): DynamoDBClient {
    const loginType = process.env.AWS_LOGIN_TYPE;
    const endpoint = process.env.DYNAMODB_AC_ENDPOINT;
    const region = process.env.AWS_AC_REGION;
    const accountId = process.env.AWS_ACCOUNT_ID;
    const sessionName = process.env.AWS_SESSION_NAME;
    const roleArn = `arn:aws:iam::${accountId}:role/${process.env.AWS_CURRENT_ROLE}`;

    const credentials =
      loginType?.toLowerCase() === 'role'
        ? fromTemporaryCredentials({
            masterCredentials: fromIni(),
            params: {
              RoleArn: roleArn,
              RoleSessionName: sessionName,
            },
          })
        : fromNodeProviderChain();

    const client = new DynamoDBClient({ region, endpoint, credentials });

    console.info(
      `New DynamoDB connection established\nEndPoint: ${endpoint}\nRegion: ${region}`
    );

    return client;
  }

  /**
   * Returns the singleton DynamoDBClient, creating it on first call.
   * Node.js is single-threaded so no additional locking is required.
   *
   * @returns DynamoDBClient
   */
  static getClient(): DynamoDBClient {
    if (!DynamoDBConnection.client) {
      DynamoDBConnection.client = DynamoDBConnection.connectDynamoDB();
    }
    return DynamoDBConnection.client;
  }

  /**
   * Returns the singleton DynamoDBDocumentClient (higher-level marshalled API).
   * Equivalent to DynamoDBMapper in the Java AWS SDK v1.
   *
   * @returns DynamoDBDocumentClient
   */
  static getDocumentClient(): DynamoDBDocumentClient {
    if (!DynamoDBConnection.docClient) {
      DynamoDBConnection.docClient = DynamoDBDocumentClient.from(
        DynamoDBConnection.getClient()
      );
    }
    return DynamoDBConnection.docClient;
  }
}
