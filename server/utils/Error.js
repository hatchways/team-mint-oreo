class _Error extends Error {
  constructor(status = 500, message = 'Server Error!', err, ...params) {
    super(...params);
    this.status = status;
    this.message = message;
    this.err = err;
    console.error(err);
  }
}

module.exports = _Error;
