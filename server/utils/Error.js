class CustomError extends Error {
  constructor(code = 500, ...params) {
    super(...params);
    this.code = code;
  }
}

module.exports = CustomError;
