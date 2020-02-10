const express = require('express');
const router = express.Router();
const UserController = require('../db/Controllers/UserController');

router.get('/welcome', function(req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

router.get('/test', (req, res) => {
  console.log('route hit');
  const mockUser = {
    displayName: 'sdfsdf',
  };
  UserController.createUser(mockUser);
});

router.get('/getuser', (req, res) => {});

module.exports = router;
