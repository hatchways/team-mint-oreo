const express = require('express');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatroomRoutes');
const inviteRoutes = require('./inviteRoutes');
const seedRoutes = require('./seedRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/invite', inviteRoutes);
router.use('/seed', seedRoutes);
router.use('/auth', authRoutes);

module.exports = router;
