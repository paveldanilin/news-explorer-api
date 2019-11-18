const badRequest = require('./bad-request');
const notAuthorize = require('./not-authorized');
const notFound = require('./not-found');
const permissionDenied = require('./permission-denied');
const serverError = require('./server-error');

class BaseError extends Error {
  constructor({ message = '', statusCode = 400, details = {devMessage: '', errorCode: 0}}) {
    super(message);
    this.statusCode = statusCode;
    this.devMessage = details.devMessage || null;
    this.errorCode = details.errorCode || null;
  }

  static BadRequest(message = 'Bad request', details = {}) {
    throw new badRequest({message, details});
  }

  static NotAuthorized(message = 'Request is not authorized', details = {}) {
    throw new notAuthorize({message, details});
  }

  static NotFound(message = 'The requested resource not found', details = {}) {
    throw new notFound({message, details});
  }

  static PermissionDenied(message = 'Access to the resource is denied', details = {}) {
    throw new permissionDenied({message, details});
  }

  static ServerError(message = 'Internal server error', details = {}) {
    throw new serverError({message, details});
  }
}

module.exports = BaseError;
