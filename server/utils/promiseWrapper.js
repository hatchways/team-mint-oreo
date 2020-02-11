const promiseWrapper = (fn, ...args) => {
  return new Promise((resolve, reject) => {
    resolve(fn(...args));
    reject(new Error());
  });
};

module.exports = { promiseWrapper };
