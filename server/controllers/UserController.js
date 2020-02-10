const User = require('../models/User');
const encryptService = require('../services/encryptionService');

const createUser = async (userData, done) => {
  console.log('createUser hit');
  const newUser = new User(userData);

  try {
    const savedUser = await newUser.save();
    return done(null, savedUser);
  } catch (err) {
    return done(err);
  }
};

const getUserByUsername = async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username });
    if (user) {
      const match = encryptService.decrypt(password, user.password);
      if (match) {
        console.log('User is found');
        return done(null, user);
      } else {
        console.log('Passwords do not match');
        return done(null, false, { message: 'passwords do not match' });
      }
    } else {
      return done(null, false, { message: 'No such username exists' });
    }
  } catch (err) {
    done(err);
  }
};

const getUserById = async id => {
  const data = await User.findById(id);
  return data;
};

const getUserFriendsById = async id => {
  const friends = await (await User.findById(id)).populate('User');
  return friends;
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getUserFriendsById,
};
