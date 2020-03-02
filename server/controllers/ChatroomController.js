const Chatroom = require('../models/Chatroom');
const Error = require('../utils/Error');
const db = require('./index');

const createChatroom = async userIds => {
  try {
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

const searchForRoomWithUser = async (target, chatIds, userId) => {
  console.log(target);
  const result = await Chatroom.find({
    _id: { $in: chatIds },
  }).populate({
    path: 'users',
    model: 'User',
    select: ['displayName', 'id', 'email', 'socketId', 'language', 'avatar'],
    match: { _id: { $ne: userId } },
    // match: { [filter]: { $regex: `.*${param}.*` } },
  });

  const regex = RegExp(`.*${target}.*`, 'i');

  const matchingRooms = result.filter(room =>
    room.users.some(user => user._id !== userId && regex.test(user.displayName))
  );

  return matchingRooms;
};

const getAllByUserId = async userId => {
  const data = await Chatroom.find({ users: userId });
  console.log('getallusersbyid', data);
};

const getDmIdOfUsers = async (userId, friendId) => {
  const { id } = await Chatroom.findOne({ isDM: true, users: { $all: [userId, friendId] } }, 'id');
  return id;
};

const getChatroomById = async (chatId, userId) => {
  try {
    const chatroom = await Chatroom.findById(chatId).populate({
      path: 'users',
      model: 'User',
      select: ['displayName', 'id', 'socketId', 'avatar'],
    });
    return chatroom;
  } catch (err) {
    throw new Error(500, 'Get Chatroom', err);
  }
};

const getAllByChatIds = async ids => {
  const chatrooms = await Chatroom.find({ _id: { $in: ids } })
    .populate({
      path: 'users',
      model: 'User',
      select: ['displayName', 'id', 'socketId', 'avatar'],
    })
    .sort('-lastMessageTimestamp')
    .limit(50)
    .skip(0);
  return chatrooms;
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
  const resp = await Chatroom.findByIdAndDelete(chatId);
  console.log(`Chatroom ${chatId} deleted`, resp);
};

const updateLastMessage = async chatId => {
  const result = await Chatroom.findByIdAndUpdate(
    chatId,
    { lastMessageTimestamp: Date.now() },
    { new: true }
  );
};

const updateLastTimeVisited = async (userId, chatId) => {
  // might have to use Map.set(userId, Date.now()) syntax
  const result = await Chatroom.findByIdAndUpdate(
    chatId,
    { activityMap: { [userId]: Date.now() } },
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
  updateLastTimeVisited,
  removeChatroom,
  updateLastMessage,
  getAllByChatIds,
  searchForRoomWithUser,
};
