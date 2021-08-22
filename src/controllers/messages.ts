import { Request, Response } from 'express';
import { MessagesService } from '../services/messages';
import { log } from '../util/log';

export async function all(request: Request, response: Response): Promise<void> {
  const messagesService = new MessagesService();

  try {
    const messages = await messagesService.all();

    response.status(200).json(messages);
  } catch (error) {
    log.error(error);

    response.status(500).json({ error: 'Failed to retrieve messages' });
  }
}
