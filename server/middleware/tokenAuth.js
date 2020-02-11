const jwt = require('../services/jwtService');

const tokenAuth = async (req, res, next) => {
  if (req && req.signedCookies) {
    const { user = null } = req.signedCookies;
    if (!user) return next();
    res.locals.userId = await jwt.verify(user);
  }
  return next();
};

module.exports = tokenAuth;
