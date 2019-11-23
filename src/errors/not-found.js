const ErrorDescription = require('./error-description');

class NotFound extends ErrorDescription {
  constructor(resource, message = 'The requested resource not found [{{resource}}]') {
    super(404, message, { resource });
  }
}

module.exports = NotFound;
