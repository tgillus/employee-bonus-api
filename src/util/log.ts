import log from 'lambda-log';

if (process.env.ENABLE_DEBUG_LOGGING === 'true') {
  log.options.debug = true;
}

export { log };
