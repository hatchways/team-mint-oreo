const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const routes = require('./routes');
const strategy = require('./config/passport-config');

// DB connection
const connectDB = require('./db/connection');

const { json, urlencoded } = express;

const app = express();

// Start the DB
connectDB();

// initialize passport

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(join(__dirname, 'public')));
passport.use('jwt', strategy);

app.use(routes);

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
  res.json({ error: err });
});

module.exports = app;
