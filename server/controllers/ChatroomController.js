const mongoose = require('mongoose');
const Chatroom = require('../models/Chatroom');
const Error = require('../utils/Error');
const db = require('./index');

const createChatroom = async userIds => {
  try {
    // const objectIdList = userIds.map(id => mongoose.Types.ObjectId(id));
    if (userIds.length < 2) throw new Error(400, 'Needs at least 2 users');
    // const newChat = await Chatroom.create({ users: userIds });
    const newChat = new Chatroom({ users: userIds });
    const savedChat = await newChat.save();
    console.log(savedChat, ' was saved in db');

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

const getUsersByChatId = async chatId => {
  try {
    const usersInChat = await Chatroom.findById(chatId).populate({
      path: 'users',
      model: 'User',
      select: ['displayName', 'id', 'email', 'socketId', 'language'],
    });
    return usersInChat.users;
  } catch (err) {
    if(err instanceof TypeError) {
      throw new TypeError('GetUsersByChatId:' + err.message, 400);
    }
    throw new Error(500, 'Internal Server Error at getUsersByChatId()', err);
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

const getLanguages = async chatId => {
  try {
    const usersInChatroom = await getUsersByChatId(chatId);
    const data = new Set(usersInChatroom.map(user => user.language));
    return [...data];
  } catch (err) {
    if(err instanceof TypeError) {
      throw new TypeError('getLanguages:' + err.message, 400);
    }
    throw new Error(500, 'Internal Server Error at getLanguages()', err);
  }
};

const removeUser = async (userId, chatId) => {
  try {
    Chatroom.findByIdAndUpdate(chatId, { $pull: { users: userId } });
  } catch (err) {
    throw new Error(500, 'Remove User', err);
  }
};

const updateActivty = async (userId, chatId) => {
  const result = await Chatroom.findByIdAndUpdate(
    chatId,
    { $set: { [userId]: Date.now() } },
    { new: true }
  );
  console.log(result);
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
  updateActivty,
};
