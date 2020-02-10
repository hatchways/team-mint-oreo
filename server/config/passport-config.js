const passportJWT = require('passport-jwt');

// Local strategy
const LocalStrategy = require('passport-local').Strategy;
const UserController = require('../controllers/UserController');

const JwtStrategy = passportJWT.Strategy;
const secret = 'some secret';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy = new JwtStrategy(opts, (payload, done) => {
  // TODO: query DB here to verify user here
  /*
              User.findOne({id: payload.sub}, function(err, user) {
                  if (err) {
                          return done(err, false);
                  }
                  if (user) {
                          return done(null, user);
                  } else {
                          return done(null, false);
                          // or you could create a new account
                  }
              });
          */
  return done(null, {
    userName: 'name',
    email: 'example@example.com',
  });
});

//this sets how we handle tokens coming from the requests that come
// and also defines the key to be used when verifying the token.
module.exports = passport => {
  passport.use('register', strategy_register);
  passport.use('jwt', strategy);
};
