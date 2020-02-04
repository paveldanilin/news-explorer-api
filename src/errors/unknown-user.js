const NotAuthorized = require('./not-authorized');

class UnknownUser extends NotAuthorized {
  constructor(user) {
    super({ user }, 'Unknown user {{user}}');
  }
}

module.exports = UnknownUser;
