const BadRequest = require('./bad-request');

class BadValue extends BadRequest {
  constructor(value, message = 'Bad value [{{value}}]') {
    super({ value }, message);
  }
}

module.exports = BadValue;
