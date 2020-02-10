const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatroomSchema = new Schema({
  users: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
