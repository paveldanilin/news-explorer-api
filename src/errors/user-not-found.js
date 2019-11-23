const NotFound = require('./not-found');

class UserNotFound extends NotFound {
  constructor(user) {
    super({ user }, 'User not found {{user}}');
  }
}

module.exports = UserNotFound;
