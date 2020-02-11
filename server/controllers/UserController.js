const User = require('../models/User');

const createUser = async userData => {
  console.log('createUser hit');
  const newUser = new User(userData);
  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.error('create user error', err);
    throw err;
  }
};

const getByEmail = async email => {
  try {
    const user = await User.findOne({ email });
    if (user) return user;
  } catch (err) {
    console.error('get user by email error', err);
  }
};

const getById = async id => {
  const data = await User.findById(id);
  return data;
};

const getFriendsById = async id => {
  const friends = await User.findById(id).populate('users');
  return friends;
};

const getChatsById = async (id, limit = 50, skip = 0) => {
  const chatrooms = await User.find({ id }, 'chatrooms', { limit, skip, sort: 'desc' });
  return chatrooms;
};

const getFieldById = async (field, id) => {
  const data = await User.findById(id, `${field}`);
  return data;
};

module.exports = {
  createUser,
  getByEmail,
  getById,
  getFriendsById,
  getChatsById,
  getFieldById,
};
