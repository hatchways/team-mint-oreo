const isAuthorized = (req, res, next) => {
  if (res.locals.userId) return next();
  next(401);
};

module.exports = isAuthorized;
