class ErrorDescription extends Error {
  constructor(httpStatusCode, message, context) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.context = context || {};
  }
}

module.exports = ErrorDescription;
