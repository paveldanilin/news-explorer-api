const BaseError = require('./base-error');

class NotFound extends BaseError {
  constructor({message = 'The requested resource not found', details = {}}) {
    const statusCode = 404;
    super({message, statusCode, details});
  }
}

module.exports = NotFound;
