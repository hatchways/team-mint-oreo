const Chatroom = require('../models/Chatroom');
const Error = require('../utils/Error');
const db = require('./index');

/*Needs a higher scope to be used in other methods */

const updateActivty = async (userId, chatId) => {
  // might have to use Map.set(userId, Date.now()) syntax
  const result = await Chatroom.findByIdAndUpdate(
    chatId,
    { $set: { [userId]: Date.now() } },
    { new: true }
  );
  console.log(result);
};

/******* */

const createChatroom = async userIds => {
  try {
    console.log('creating chatroom');
    console.log(db);
    if (userIds.length < 2) throw new Error(400, 'Needs at least 2 users');
    const isDM = userIds.length === 2;
    const activityMap = userIds.reduce((a, userId) => ({ ...a, [userId]: Date.now() }), {});
    const newChat = await Chatroom.create({ users: userIds, isDM, activityMap });
    console.log('New Chat Created: ', newChat);

    return newChat.id;
  } catch (err) {
    throw new Error(500, 'Create Chat', err);
  }
};

const addUser = async (userId, chatId) => {
  try {
    const chatroom = await Chatroom.findByIdAndUpdate(
      chatId,
      { $addToSet: { users: userId }, activityMap: { userId: Date.now() } },
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
    if (err instanceof TypeError) {
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

const getChatroomById = async (chatId, { selectFromUsers }, userId) => {
  try {
    const chatroom = await Chatroom.findById(chatId).populate({
      path: 'users',
      model: 'User',
      select: selectFromUsers,
    });

    const { activityMap, ...rest } = chatroom.toObject();
    const withLastActivity = { ...rest, lastActivity: activityMap.get(userId) };
    return withLastActivity;
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
    if (err instanceof TypeError) {
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

const removeChatroom = async chatId => {
  const resp = await Chatroom.findOneAndDelete({ id: chatId });
  console.log(`Chatroom deleted`, resp);
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
  removeChatroom,
};
