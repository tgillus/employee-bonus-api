import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { log } from './util/log';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  log.info('event', event);

  const client = new SNSClient({
    region: 'us-east-1',
  });
  const command = new PublishCommand({
    TopicArn: process.env.SAVE_EMPLOYEE_BONUS_SNS_TOPIC,
    Message: JSON.stringify({
      bonuses: [
        {
          employee: '111111111',
          bonus: 500.0,
        },
      ],
    }),
  });
  const response = await client.send(command);

  log.info('response', response);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Bonus pay received.',
    }),
  };
};
