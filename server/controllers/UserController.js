const mongoose = require('mongoose');
const User = require('../models/User');

const createUser = async (userData, done) => {
  console.log('createUser hit');
  const newUser = new User(userData);
  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.error('create user error', err);
  }
};

const getUserByEmail = async email => {
  try {
    const user = await User.findOne({ email });
    if (user) return user;
  } catch (err) {
    console.error('get user by email error', err);
  }
};

const getUserById = async id => {
  const data = await User.findById(id);
  return data;
};

const getUserFriendsById = async id => {
  const friends = await User.findById(id).populate('users');
  return friends;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserFriendsById,
};
