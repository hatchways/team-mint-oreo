const express = require('express');
const router = express.Router();

const secret = 'some secret';

const passport = require('passport');
const jwt = require('jsonwebtoken');

// Require all models here
const User = require('../models/User');

router.post('/login', (req, res) => {
  // TODO: query DB to ensure that id is correct.
  // const user = new User({
  //     username: req.body.username,
  //     password: req.body.password
  // });

  const payload = {
    id: '1234',
    name: 'userName',
    someInfo: 'some information is stored here',
  };
  jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
    if (err) res.status(500).json({ error: 'Error signing token', raw: err });
    res.json({
      success: true,
      token: `${token}`,
    });
  });
});

router.post('/register', (req, res, next) => {
  passport.authenticate('register', async (err, user, msg) => {
    try {
      if (err) throw err;

      if (msg) {
        console.log(msg.message);
        return res.status(401).json({
          error: msg.message,
        });
      } else {
        // req.logIn(user, async (err) => {
        // if(err) throw err;
        const filter = { email: req.body.email };
        const data = {
          displayName: req.body.displayName,
          language: req.body.language,
        };

        const foundUser = await User.findOneAndUpdate(filter, data, {
          new: true,
        });
        console.log(foundUser);
        console.log('User created in db');
        return res.status(200).json({
          success: true,
          foundUser,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  })(req, res, next);
});

router.get('/path', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ result: 'authenticated' });
});

module.exports = router;
