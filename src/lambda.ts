import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { logger } from './util/logger';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info(JSON.stringify(event));

  const client = new SNSClient({
    region: 'us-east-1',
  });
  const command = new PublishCommand({
    TopicArn: process.env.SAVE_EMPLOYEE_BONUS_SNS_TOPIC,
    Message: 'Foobar!!',
  });
  const response = await client.send(command);

  logger.info(JSON.stringify(response));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Bonus pay received.',
    }),
  };
};
