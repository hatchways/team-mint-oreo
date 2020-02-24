const express = require('express');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatroomRoutes');
const inviteRoutes = require('./inviteRoutes');
const seedRoutes = require('./seedRoutes');
const catchAsyncError = require('../middleware/catchAsyncError');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/invite', inviteRoutes);
router.use('/seed', seedRoutes);

module.exports = router;
