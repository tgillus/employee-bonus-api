import './util/env';
import { app } from './express/app';
import { log } from './util/log';

const port = process.env.PORT;

app.listen(port, () => {
  log.info(`listening on port ${port}.`);
});
