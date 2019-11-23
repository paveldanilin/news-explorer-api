const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit');
const { errors } = require('celebrate');

const config = require('./config');
const locale = require('./i18n');
const { errorLogger } = require('./logger');
const requestId = require('./middlewares/request-id');
const ErrorDescription = require('./errors/error-description');

const server = express();

server.use(requestId);
server.use(rateLimiter({ max: config.RATE_LIMIT_MAX, windowMs: config.RATE_LIMIT_WINDOW }));
server.use(helmet());
server.use(cors());
server.use(locale.init);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/test', (req, res) => {
  res.status(200).send({ test: 'ok' });
});

server.use(errors());

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  const { httpStatusCode = 500, message = locale.translate(ErrorDescription.SERVER_ERROR()) } = err;
  res.status(httpStatusCode).send({ message });
});

server.listen(config.SERVER_PORT, () => {
  // logger.requestLogger.info(`App listening on port ${config.SERVER_PORT}`);
  // console.log(config.SERVER_PORT);
  errorLogger.error('test');
});
