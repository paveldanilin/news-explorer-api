const { errorLogger } = require('../logger');
const locale = require('../i18n');

module.exports = (err, req, res, next) => {
  const {
    httpStatusCode = 500,
    message = 'Internal server error',
    devMessage = err.stack || '',
    context = err.context || {}
  } = err;

  const userMessage = locale.translate(message, context);

  errorLogger.error({ requestId: req.requestId, message: userMessage, devMessage });

  res.status(httpStatusCode).send({ message: userMessage });
};
