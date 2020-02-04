const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  SERVER_PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/news_explorer',
  JWT_SECRET: process.env.JWT_SECRET || '123456',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 1800000,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 1000,
  LOG_DIR: process.env.LOG_DIR || './logs',
  LOG_REQUEST_FILENAME: process.env.LOG_REQUEST_FILENAME || 'request-%DATE%.log',
  LOG_REQUEST_LEVEL: process.env.LOG_REQUEST_LEVEL || 'silly',
  LOG_REQUEST_MAX_SIZE: process.env.LOG_REQUEST_MAX_SIZE || '100m',
  LOG_REQUEST_MAX_FILES: process.env.LOG_REQUEST_MAX_FILES || '30d',
  LOG_ERROR_FILENAME: process.env.LOG_ERROR_FILENAME || 'error-%DATE%.log',
  LOG_ERROR_LEVEL: process.env.LOG_ERROR_LEVEL || 'silly',
  LOG_ERROR_MAX_SIZE: process.env.LOG_ERROR_MAX_SIZE || '100m',
  LOG_ERROR_MAX_FILES: process.env.LOG_ERROR_MAX_FILES || '30d',
  LOG_COMMON_FILENAME: process.env.LOG_COMMON_FILENAME || 'common-%DATE%.log',
  LOG_COMMON_LEVEL: process.env.LOG_COMMON_LEVEL || 'silly',
  LOG_COMMON_MAX_SIZE: process.env.LOG_COMMON_MAX_SIZE || '100m',
  LOG_COMMON_MAX_FILES: process.env.LOG_COMMON_MAX_FILES || '30d',
};
