const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
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
    displayName: { type: String, default: '' },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    language: {
      type: String,
      required: true,
      default: 'en',
      lowercase: true,
      trim: true,
    },
    avatar: { type: String, default: '' },
    chatrooms: [{ type: Schema.Types.ObjectId, ref: 'Chatroom' }],
    socketId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
