const mongoose = require('mongoose');
const Message = require('../models/Message');
const Error = require('../utils/Error');

const createMessage = async msg => {
  const { userId, chatId, ...rest } = msg;
  const { ObjectId } = mongoose.Types;
  try {
    const newMessage = await Message.create({
      userId: ObjectId(userId),
      chatId: ObjectId(chatId),
      ...rest,
    });
    console.log(newMessage);
  } catch (err) {
    throw new Error(500, 'Create Message', err);
  }
};

const getMessage = async (chatId, limit = 50, skip = 0) => {
  try {
    const messages = await Message.find({ chatId }, null, skip)
      .limit(limit)
      .sort('-createdAt');

    return messages;
  } catch (err) {
    throw new Error(500, 'Get Message - ID', err);
  }
};

module.exports = {
  createMessage,
  getMessage,
};
