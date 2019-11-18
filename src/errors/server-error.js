const BaseError = require('./base-error');

class ServerError extends BaseError {
  constructor({message = 'Internal server error', details = {}}) {
    const statusCode = 500;
    super({message, statusCode, details});
  }
}

module.exports = ServerError;
