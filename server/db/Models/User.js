const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
});

const User = mongoose.model('User', userSchema);

module.exports = User;
