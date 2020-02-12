const User = require('../models/User');

const createUser = async userData => {
  console.log(`Creating User...${userData.email}`);
  const newUser = new User(userData);
  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    throw new Error(500, 'Create User', err);
  }
};

const getByEmail = async email => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw new Error(500, 'Get User - Email', err);
  }
};

const getById = async id => {
  try {
    const data = await User.findById(id);
    return data;
  } catch (err) {
    throw new Error(500, 'Get User - ID', err);
  }
};

const getFriendsById = async id => {
  try {
    const friends = await User.findById(id, 'friends').populate('users');
    return friends;
  } catch (err) {
    throw new Error(500, 'Get Friends - ID', err);
  }
};

const getFriendsSocketsById = async id => {
  try {
    const onlineFriends = await User.findById(id)
      .populate('users')
      .exec((err, users) => {
        if (!users || !users.length) return null;
        return users.filter(user => user.socketId).map(user => user.socketId);
      });
    console.log('online friends', onlineFriends);
  } catch (err) {
    throw new Error(500, 'Get Friends Sockets - ID', err);
  }
};

const getChatsById = async (id, limit = 50, skip = 0) => {
  try {
    const chatrooms = await User.findById(id, 'chatrooms', { limit, skip, sort: 'desc' });
    return chatrooms;
  } catch (err) {
    throw new Error(500, 'Get Chats - ID', err);
  }
};

const getFieldById = async (field, id) => {
  try {
    const data = await User.findById(id, `${field}`);
    return data;
  } catch (err) {
    throw new Error(500, 'Get (Field) - ID', err);
  }
};

const setSocketIdById = async (userId, socketId) => {
  try {
    const result = await User.findByIdAndUpdate(userId, { socketId }, { new: true });
    console.log(result);
  } catch (err) {
    throw new Error(500, 'Get SocketID - ID', err);
  }
};

const clearSocketId = socketId => {
  try {
    User.findOneAndUpdate({ socketId }, { socketId: undefined });
  } catch (err) {
    throw new Error(500, 'Clear SocketID', err);
  }
};

module.exports = {
  createUser,
  getByEmail,
  getById,
  getFriendsById,
  getChatsById,
  getFieldById,
  setSocketIdById,
  clearSocketId,
  getFriendsSocketsById,
};
