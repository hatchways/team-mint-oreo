const express = require('express');
const userRoutes = require('./userRoutes');
const UserController = require('../db/Controllers/UserController');

const router = express.Router();

router.use('/user', userRoutes);

router.get('/test', (req, res) => {
  console.log('route hit');
  const mockUser = {
    displayName: 'NEW NAME',
  };
  UserController.createUser(mockUser);
});

module.exports = router;
