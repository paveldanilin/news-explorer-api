const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit');
const { errors } = require('celebrate');
require('express-async-errors');

const config = require('./config');
const locale = require('./i18n');
const { requestLogger, errorLogger, commonLogger } = require('./logger');
const requestId = require('./middlewares/request-id');
const BaseError = require('./errors/base-error');
const db = require('./db');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');

const server = express();

server.use(requestId);
server.use(rateLimiter({ max: config.RATE_LIMIT_MAX, windowMs: config.RATE_LIMIT_WINDOW }));
server.use(helmet());
server.use(cors());
server.use(locale.init);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(requestLogger);

server.use(loginRouter);
server.use(usersRouter);
server.use(articlesRouter);

server.use(errors());
server.use('*', (req) => BaseError.NotFound(req.originalUrl));
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  const {
    httpStatusCode = 500,
    message = 'Internal server error',
    devMessage = err.stack || null,
  } = err;
  const userMessage = locale.translate(message, err.context || {});
  errorLogger.error({ requestId: req.requestId, message: userMessage, devMessage });
  res.status(httpStatusCode).send({ message: userMessage });
});

const app = server.listen(config.SERVER_PORT, async () => {
  try {
    await db.init();
    commonLogger.info(`Connected to DB=${config.MONGODB_URL}`);
  } catch (e) {
    app.close(() => {
      errorLogger.error(e.toString());
      commonLogger.error(e.toString());
    });
  }
  commonLogger.info(`Server started, PORT=${config.SERVER_PORT}`);
});
