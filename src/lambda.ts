import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyStructuredResultV2,
  Context,
} from 'aws-lambda';
import { log } from './util/log';
import { app } from './express/app';
import serverless from 'serverless-http';

const serverlessHandler = serverless(app, {
  basePath: '/compensation',
});

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult | APIGatewayProxyStructuredResultV2> => {
  log.info('event', event);
  log.info('context', context);
  const result = await serverlessHandler(event, context);
  log.info('result', result);
  return result;
};
