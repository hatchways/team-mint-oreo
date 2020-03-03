const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json({ limit: '5mb' }));

// Start the DB
connectDB();

app.use(logger('dev'));
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

//if (process.env.NODE_ENV === 'production') {

// take out last 7 characters server/
const newRoute = __dirname.substring(0, __dirname.length - 7);
app.use(express.static(join(newRoute, 'client/build')));
const sendFrontEnd = (req, res) => {
  // serve the react app
  console.log('serveFile', join(newRoute, 'client/build', 'index.html'));
  res.sendFile(join(newRoute, 'client/build', 'index.html'));
};
//}

// app.use(passport.initialize());
// passport.use('jwt', strategy);
app.use(tokenAuth);
app.use(routes);
app.get('/*', sendFrontEnd);

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
