const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    displayName: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    language: {
      type: String,
      required: true,
      default: 'english',
    },
    chatrooms: [{ type: Schema.Types.ObjectId, ref: 'Chatroom' }],
    socketId: {
      type: String,
      default: undefined,
    },
    lastActivity: Date,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
