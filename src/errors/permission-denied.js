const BaseError = require('./base-error');

class PermissionDenied extends BaseError {
  constructor({message = 'Access to the resource is denied', details = {}}) {
    const statusCode = 403;
    super({message, statusCode, details});
  }
}

module.exports = PermissionDenied;
