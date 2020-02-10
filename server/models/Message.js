const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    chatId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
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

const Message = mongoose('Message', messageSchema);

module.exports = Message;
