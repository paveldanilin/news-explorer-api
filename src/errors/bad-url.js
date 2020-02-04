const BadRequest = require('./bad-request');

class BadUrl extends BadRequest {
  constructor(value) {
    super({ value }, 'Value is not an url {{value}}');
  }
}

module.exports = BadUrl;
