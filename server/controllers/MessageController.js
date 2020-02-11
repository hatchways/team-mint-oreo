const Message = require('../models/Message');

const createMessage = async msg => {
  const newMessage = new Message(msg);
  try {
    const savedMsg = await newMessage.save();
    console.log('creating message', savedMsg);
    return savedMsg;
  } catch (error) {
    return { error };
  }
};

const getMessagesByChatId = async (chatId, limit = 50, skip = 0) => {
  try {
    const messages = await Message.find({ chatId }, null, skip)
      .limit(limit)
      .sort('-createdAt');

    return messages;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  createMessage,
  getMessagesByChatId,
};
