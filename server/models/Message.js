const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chatroom',
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    originalText: {
      type: String,
      required: true,
    },
    translations: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

messageSchema.index({ createdAt: -1 });
messageSchema.index({ updatedAt: -1 });
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
