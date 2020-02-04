const ErrorDescription = require('./error-description');

class BadRequest extends ErrorDescription {
  constructor(context = {}, message = 'Bad request') {
    super(400, message, context);
  }
}

module.exports = BadRequest;
