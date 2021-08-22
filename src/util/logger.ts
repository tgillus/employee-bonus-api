import * as winston from 'winston';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
});

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true })
);

const transports = [
  new winston.transports.Console({
    format: consoleFormat,
  }),
];

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.json(),
  levels,
  transports,
});
