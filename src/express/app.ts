import express from 'express';
import { messagesRouter } from '../routes/messages';

const app = express();

app.use('/messages', messagesRouter);

export { app };
