const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/welcome', (req, res, next) => {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

router.get('/test', (req, res) => {
  console.log('route hit');
  const mockUser = {
    displayName: 'NEW NAME',
  };
  UserController.createUser(mockUser);
});

router.get('/getuser', (req, res) => {});

module.exports = router;
