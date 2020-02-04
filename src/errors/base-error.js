const BadRequest = require('./bad-request');
const NotAuthorized = require('./not-authorized');
const NotFond = require('./not-found');
const PermissionDenied = require('./permission-denied');
const ServerError = require('./server-error');

class BaseError {
  static BadRequest() {
    throw new BadRequest();
  }

  static NotAuthorized() {
    throw new NotAuthorized();
  }

  static NotFound(resource) {
    throw new NotFond(resource || 'unknown');
  }

  static PermissionDenied(user) {
    throw new PermissionDenied(user || 'unknown');
  }

  static ServerError() {
    throw new ServerError();
  }
}

module.exports = BaseError;
