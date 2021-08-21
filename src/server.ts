import './util/env';
import 'reflect-metadata';
import { app } from './express/app';
import { logger } from './util/logger';

const port = process.env.PORT;

app.listen(port, () => {
  logger.info(`listening on port ${port}.`);
});
