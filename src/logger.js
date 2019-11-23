const { createLogger, format, transports } = require('winston');
const expressWinston = require('express-winston');
const config = require('./config');
require('winston-daily-rotate-file');

module.exports = {
  requestLogger: expressWinston.logger({
    transports: [
      new transports.DailyRotateFile({
        dirname: config.LOG_DIR,
        filename: config.LOG_REQUEST_FILENAME,
        maxSize: config.LOG_REQUEST_MAX_SIZE,
        maxFiles: config.LOG_REQUEST_MAX_FILES,
        level: config.LOG_REQUEST_LEVEL,
        json: true,
        format: format.combine(
          format.timestamp(), format.json(),
        ),
      }),
    ],
    requestWhitelist: ['requestId', 'url', 'headers', 'method', 'httpVersion', 'originalUrl', 'query'],
  }),
  errorLogger: createLogger({
    transports: [
      new transports.DailyRotateFile({
        dirname: config.LOG_DIR,
        filename: config.LOG_ERROR_FILENAME,
        maxSize: config.LOG_ERROR_MAX_SIZE,
        maxFiles: config.LOG_ERROR_MAX_FILES,
        level: config.LOG_ERROR_LEVEL,
        json: true,
        format: format.combine(
          format.timestamp(), format.json(),
        ),
      }),
    ],
  }),
  commonLogger: createLogger({
    transports: [
      new transports.DailyRotateFile({
        dirname: config.LOG_DIR,
        filename: config.LOG_COMMON_FILENAME,
        maxSize: config.LOG_COMMON_MAX_SIZE,
        maxFiles: config.LOG_COMMON_MAX_FILES,
        level: config.LOG_COMMON_LEVEL,
        json: true,
        format: format.combine(
          format.timestamp(), format.json(),
        ),
      }),
      new transports.Console(),
    ],
  }),
};
