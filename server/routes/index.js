const express = require('express');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatroomRoutes');
const inviteRoutes = require('./inviteRoutes');
const seedRoutes = require('./seedRoutes');
const catchAsyncError = require('../middleware/catchAsyncError');

const router = express.Router();

router.use('/user', catchAsyncError(userRoutes));
router.use('/chat', catchAsyncError(chatRoutes));
router.use('/invite', catchAsyncError(inviteRoutes));
router.use('/seed', catchAsyncError(seedRoutes));

module.exports = router;
