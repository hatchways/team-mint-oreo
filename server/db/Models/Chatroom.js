const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatroomSchema = new Schema({
  users: {
    type: Map,
    of: ObjectId,
    ref: 'User',
  },
});

const Chatroom = mongoose.model('User', chatroomSchema);

module.exports = Chatroom;
