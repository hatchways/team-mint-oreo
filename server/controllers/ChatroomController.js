const mongoose = require('mongoose');
const Chatroom = require('../models/Chatroom');
const Error = require('../utils/Error');

const createChatroom = async userIds => {
  try {
    console.log('creating chatroom');
    // const objectIdList = userIds.map(id => mongoose.Types.ObjectId(id));
    if (userIds.length < 2) throw new Error(400, 'Needs at least 2 users');
    const newChat = await Chatroom.create({ users: userIds });
    console.log(newChat);
    return newChat.id;
  } catch (err) {
    throw new Error(500, 'Create Chat', err);
  }
};

const addUser = async (userId, chatId) => {
  try {
    const chatroom = await Chatroom.findByIdAndUpdate(
      chatId,
      { $addToSet: { users: userId } },
      { new: true }
    );
  } catch (err) {
    throw new Error(500, 'Add User To Chat', err);
  }
};

const getChatroomById = async (chatId, { select }) => {
  try {
    const chatroom = await Chatroom.findById(chatId).populate({
      path: 'users',
      model: 'User',
      select,
    });
    return chatroom;
  } catch (err) {
    throw new Error(500, 'Get Chatroom', err);
  }
};

const getUsersByChatId = async chatId => {
  try {
    const usersInChat = await Chatroom.findById(chatId).populate({
      path: 'users',
      model: 'User',
      select: ['displayName', 'id', 'email', 'socketId', 'language'],
    });
    return usersInChat.users;
  } catch (err) {
    throw new Error(500, 'Get Users In Chat', err);
  }
};

const removeUser = async (userId, chatId) => {
  try {
    Chatroom.findByIdAndUpdate(chatId, { $pull: { users: userId } });
  } catch (err) {
    throw new Error(500, 'Remove User', err);
  }
};

const getLanguages = async chatId => {
  try {
    const usersInChatroom = await getUsersByChatId(chatId);
    const data = new Set(usersInChatroom.map(user => user.language));
    return [...data];
  } catch (err) {
    throw new Error(500, 'Get Language & ID from Chat', err);
  }
};

const getAllByUserId = async userId => {
  const data = await Chatroom.find({ users: userId });
  console.log('getallusersbyid', data);
};

const getDmIdOfUsers = async (userId, friendId) => {
  const { id } = await Chatroom.findOne({ isDM: true, users: { $all: [userId, friendId] } }, 'id');
  return id;
};

module.exports = {
  addUser,
  createChatroom,
  getChatroomById,
  getUsersByChatId,
  removeUser,
  getLanguages,
  getAllByUserId,
  getDmIdOfUsers,
};
