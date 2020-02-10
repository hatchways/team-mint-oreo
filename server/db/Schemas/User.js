const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  friends: [{ type: ObjectId, ref: 'User' }],
  language: {
    type: String,
    required: true,
    default: 'english',
  },
  chatrooms: [{ type: ObjectId, ref: 'Chatroom' }],
  socketId: {
    type: String,
    default: undefined,
  },
  lastActivity: Date,
});

module.exports = userSchema;
