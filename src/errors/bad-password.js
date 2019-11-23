const NotAuthorized = require('./not-authorized');

class BadPassword extends NotAuthorized {
  constructor() {
    super({}, 'Bad password');
  }
}

module.exports = BadPassword;
