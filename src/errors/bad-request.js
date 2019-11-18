const BaseError = require('./base-error');

class BadRequest extends BaseError {
  constructor({message = 'Bad request', details = {}}) {
    const statusCode = 400;
    super({message, statusCode, details});
  }
}

module.exports = BadRequest;
