const express = require('express');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatroomRoutes');
const inviteRoutes = require('./inviteRoutes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/invite', inviteRoutes);

module.exports = router;
