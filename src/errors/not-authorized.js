const ErrorDescription = require('./error-description');

class NotAuthorized extends ErrorDescription {
  constructor(context = {}, message = 'Request is not authorized') {
    super(401, message, context);
  }
}

module.exports = NotAuthorized;
