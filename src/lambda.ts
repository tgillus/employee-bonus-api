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

  logger.info('Hello logger.');
  logger.error('foo', new Error('foobar'));
  let foo: string;
  foo!.toString();

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

  logger.info(JSON.stringify(response));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Bonus pay received.',
    }),
  };
};
