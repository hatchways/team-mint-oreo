const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Local strategy
const LocalStrategy = require('passport-local').Strategy;
const UserController = require('../controllers/UserController');
const encryptService = require('../services/encryptionService');

const secret = 'some secret';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy_register = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  (username, password, done) => {
    try {
      UserController.getUserByUsername(username, password, async (err, user) => {
        if (user) {
          console.log('Username already exists');
          return done(null, false, { message: 'Username already exists' });
        } else {
          const hashedPassword = await encryptService.encrypt(password);
          UserController.createUser(
            { email: username, password: hashedPassword },
            (err, savedUser) => {
              if (err) throw err;
              console.log('User created');
              return done(null, savedUser);
            }
          );
        }
      });
    } catch (err) {
      return done(err);
    }
  }
);

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
