const ErrorDescription = require('./error-description');

class PermissionDenied extends ErrorDescription {
  constructor(user, message = 'Access denied [{{user}}]') {
    super(403, message, { user });
  }
}

module.exports = PermissionDenied;
