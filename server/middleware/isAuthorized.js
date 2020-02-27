const isAuthorized = (req, res, next) => {
  if (res.locals.userId) return next();
  return next({ status: 401 });
};

module.exports = { isAuthorized };
