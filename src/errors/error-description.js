class ErrorDescription {
  constructor(httpStatusCode, message, devMessage) {
    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.devMessage = devMessage;
  }

  static SERVER_ERROR() {
    return 'Internal server error';
  }
}
