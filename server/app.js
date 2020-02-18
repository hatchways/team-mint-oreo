const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes');
const tokenAuth = require('./middleware/tokenAuth');

// const passport = require('passport');
// const strategy = require('./config/passport-config');

// DB connection
const connectDB = require('./db/connection');

const { json, urlencoded } = express;

const app = express();

// Start the DB
connectDB();

app.use(logger('dev'));
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(join(__dirname, 'public')));
// app.use(passport.initialize());
// passport.use('jwt', strategy);
app.use(tokenAuth);
app.use(routes);

// for testing purposes
app.get('/test', (req, res) => {
  res.status(200).send();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('logging error', err.status);
  if (err.status === 401) res.clearCookie('user');
  res.json({ error: err });
});

module.exports = app;
