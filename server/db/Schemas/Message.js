const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  chatroomId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  originalText: {
    type: String,
    required: true,
  },
  translations: {
    type: Map,
    of: String,
  },
});

module.exports = messageSchema;
