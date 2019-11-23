const { createLogger, format, transports } = require('winston');
const config = require('./config');
require('winston-daily-rotate-file');

module.exports = {
  requestLogger: createLogger({
    transports: [
      new transports.DailyRotateFile({
        dirname: config.LOG_DIR,
        filename: config.LOG_REQUEST_FILENAME,
        maxSize: config.LOG_REQUEST_MAX_SIZE,
        maxFiles: config.LOG_REQUEST_MAX_FILES,
        level: config.LOG_REQUEST_LEVEL,
        json: true,
        format: format.combine(
          format.timestamp({ alias: 'timestamp', format: 'YYYY-MM-DDTHH:mm:ss.sss' }),
        ),
      }),
    ],
  }),
  errorLogger: createLogger({
    transports: [
      new transports.DailyRotateFile({
        dirname: config.LOG_DIR,
        filename: config.LOG_ERROR_FILENAME,
        maxSize: config.LOG_ERROR_MAX_SIZE,
        maxFiles: config.LOG_ERROR_MAX_FILES,
        level: 'error',
        json: true,
        format: format.combine(
          format.timestamp({ alias: 'timestamp', format: 'YYYY-MM-DDTHH:mm:ss.sss' }),
        ),
      }),
    ],
  }),
};
