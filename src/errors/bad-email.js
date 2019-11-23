const BadRequest = require('./bad-request');

class BadEmail extends BadRequest {
  constructor(value) {
    super({ value }, 'Value is not an email {{value}}');
  }
}

module.exports = BadEmail;
