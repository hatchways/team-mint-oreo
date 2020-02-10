const mongoose = require('mongoose');
<<<<<<< HEAD

const { Schema } = mongoose;
const userSchema = new Schema(
=======
const { Schema } = mongoose;
const userSchema = Schema(
>>>>>>> message controller started
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
    pendingInvitations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Invitation',
      },
    ],
    lastActivity: Date,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
