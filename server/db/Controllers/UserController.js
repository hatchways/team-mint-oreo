const User = require('../Models/User');

const createUser = userData => {
  const newUser = new User(userData);
  newUser.save(err => {
    if (err) throw err;
    console.log('new user created', userData);
  });
};

const getUserById = async id => {
  const data = await User.findById(id);
  return data;
};

const getUserFriendsById = async id => {
  const friends = await (await User.findById(id)).populate('users');
  return friends;
};

module.exports = {
  createUser,
  getUserById,
  getUserFriendsById,
};
