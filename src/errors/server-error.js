const ErrorDescription = require('./error-description');

class ServerError extends ErrorDescription {
  constructor(context, message = 'Internal server error') {
    super(500, message, context);
  }
}

module.exports = ServerError;
