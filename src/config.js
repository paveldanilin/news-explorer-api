const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  SERVER_PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/news_explorer',
  JWT_SECRET: process.env.JWT_SECRET || '123456',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
};
