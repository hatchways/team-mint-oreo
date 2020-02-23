const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatroomSchema = new Schema(
  {
    users: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    isDM: {
      type: Boolean,
      default: true,
    },
    activityMap: {
      type: Map,
      of: Number,
    },
    lastMessageTimestamp: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
