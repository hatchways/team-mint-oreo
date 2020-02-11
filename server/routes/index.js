const express = require('express');
const UserController = require('../controllers/UserController');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/user', userRoutes);

module.exports = router;
