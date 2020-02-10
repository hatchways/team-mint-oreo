const User = require('../Models/User');
const db = require('../connection');

const createUser = (userData) => {
  console.log('createUser hit');
  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) throw err;
    console.log('new user created', userData);
  });
};

const getUserById = async (id) => {
  const data = await User.findById(id);
  return data;
};

const getUserFriendsById = async (id) => {
  const friends = await (await User.findById(id)).populate('User');
  return friends;
};

module.exports = {
  createUser,
  getUserById,
  getUserFriendsById,
};
