import supertest from 'supertest';
import { MessagesService } from '../src/services/messages';
import { app } from '../src/express/app';
import { logger } from '../src/util/logger';

beforeAll(async () => {
  logger.transports.forEach((transport) => {
    transport.silent = true;
  });
});

describe('GET /messages', () => {
  test.skip('returns all messages', async () => {
    const response = await supertest(app).get('/messages');

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual([
      {
        id: 1,
        body: 'Hi!',
      },
      {
        id: 2,
        body: 'Bye!',
      },
    ]);
  });

  test.skip('returns error if an exception is thrown when retrieving messages', async () => {
    const spy = jest
      .spyOn(MessagesService.prototype, 'all')
      .mockImplementation(async () => {
        throw new Error('mock');
      });

    const response = await supertest(app).get('/messages');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual({
      error: 'Failed to retrieve messages',
    });
  });
});
