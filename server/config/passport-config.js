const JwtStrategy = require('passport-jwt').Strategy;
const userController = require('../controllers/UserController');

const getCookie = req => {
  console.log('get cookie running');
  let token = null;
  if (req && req.cookies) {
    token = req.signedCookies.user;
  }
  return token;
};

const opts = {
  jwtFromRequest: getCookie,
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(opts, (payload, done) => {
  console.log('strategy firing');
  userController.getById({ id: payload.id }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      console.log('jwt verified');
      return done(null, user);
    }
    return done(null, false);
  });
});

module.exports = {
  strategy,
};
