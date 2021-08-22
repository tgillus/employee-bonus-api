import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import log from 'lambda-log';

// import { logger } from './util/logger';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // logger.info(JSON.stringify(event));
  log.info('event', event);

  // logger.info('Hello logger.', {});
  log.info('Hello Lambda!');
  // logger.error('foo', new Error('foobar'));
  log.error(new Error('foo'));
  // let foo: string;
  // foo!.toString();

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

  // logger.info(JSON.stringify(response));
  log.info('response', response);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Bonus pay received.',
    }),
  };
};
