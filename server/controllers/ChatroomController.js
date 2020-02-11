const mongoose = require('mongoose');
const Chatroom = require('../models/Chatroom');

const addUserToChat = async (userId, chatId) => {
  Chatroom.findByIdAndUpdate(chatId, { $push: { users: userId } });
};

const createChatroom = async userIds => {
  try {
    console.log('creating chatroom');
    const objectIdList = userIds.map(id => mongoose.Types.ObjectId(id));
    const newChat = Chatroom.create({ $push: { users: { $each: objectIdList } } });

    (await newChat).save();
    const chatId = (await newChat).id;
    return chatId;
  } catch (err) {
    console.error('create chatroom err', err);
  }
};

const getUsersInChatroom = chatId => {
  const users = Chatroom.findById(chatId)
    .populate('users')
    .exec((err, data) => {
      console.log(data);
    });
};

module.exports = {
  addUserToChat,
  createChatroom,
  getUsersInChatroom,
};
