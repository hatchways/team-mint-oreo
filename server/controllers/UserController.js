const User = require('../models/User');
const Error = require('../utils/Error');
const ValidationError = require('mongoose').Error.ValidationError;

/**USER METHODS */

const getAllUsers = () => {
  return User.find();
};

const createUser = async userData => {
  console.log(`Creating User...${userData.email}`);
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new Error(400, 'createUser: ' + err.message, err);
    }
    throw new Error(500, 'Internal Server Error occured in createUser()', err);
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

const getByEmail = async email => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new Error(400, 'getByEmail: ' + err.message, err);
    }
    throw new Error(500, 'Get User - Email', err);
  }
};

const getFieldById = async (field, id) => {
  try {
    const data = await User.findById(id, `${field}`);
    console.log(`field: ${field} => `, data);
    return data;
  } catch (err) {
    throw new Error(500, 'Get (Field) - ID', err);
  }
};

const getAssociatedUserByCode = async code => {
  try {
    const user = await User.findOne({ inviteCode: code });
    return user;
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new Error(400, 'getAssociatedUserByCode: ' + err.message, err);
    }
    throw new Error(500, 'Internal Server Error at getAssociatedUserByCode()', err);
  }
};

const checkFriendship = async (userEmail, friendEmail) => {
  try {
    const user = await User.findOne({ email: userEmail }).populate('friends', 'email');
    const friendExists = user.friends.some(friend => {
      return friend.email === friendEmail;
    });
    return friendExists;
  } catch (err) {
    throw new Error(500, 'Check Friendship', err);
  }
};

const searchByName = async (name, userId) => {
  try {
    // find the user with by the id and get the friends field
    // then populate the data with the friend's name
    const data = await User.findById(userId, 'friends').populate({
      path: 'friends',
      select: ['displayName', 'socketId', 'id', 'avatar'],
      match: { displayName: { $regex: `.*${name}.*` } },
    });
    console.log('SEARCH BY NAME', data);
    return data;
  } catch (err) {
    throw new Error(500, 'Get Friends - ID', err);
  }
};

const removeUser = async userId => {
  const result = await User.findOneAndDelete({ _id: userId });
  console.log('DELETING USER', result);
};

/** USER SOCKET METHODS */

const setSocketIdById = async (userId, socketId) => {
  try {
    const data = await User.findByIdAndUpdate(userId, { socketId }, { new: true });
  } catch (err) {
    throw new Error(500, 'Get SocketID - ID', err);
  }
};

const clearSocketId = async socketId => {
  try {
    const result = await User.findOneAndUpdate(
      { socketId },
      { socketId: undefined },
      { new: true }
    );
    console.log(result);
  } catch (err) {
    throw new Error(500, 'Clear SocketID', err);
  }
};

/**FRIEND METHODS */

const addFriend = async (userId, friendId) => {
  try {
    console.log('userId: ', userId);
    console.log('friendId: ', friendId);
    // Add each other as friends
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );
    const friendUpdate = await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: userId } },
      { new: true }
    );

    console.log('user: ', user);
    console.log('friend: ', friendUpdate);
  } catch (err) {
    throw new Error(500, 'Add Friend - ID', err);
  }
};

const getFriendsById = async id => {
  try {
    // find the user with by the id and get the friends field
    // then populate the data with the friend's name
    const data = await User.findById(id, 'friends').populate({
      path: 'friends',
      select: ['displayName'],
    });
    return data;
  } catch (err) {
    throw new Error(500, 'Get Friends - ID', err);
  }
};

const getFriendsFieldsById = async (fields, id) => {
  try {
    const { friends } = await User.findById(id, 'friends').populate({
      path: 'friends',
      select: fields,
    });
    return friends;
  } catch (err) {
    throw new Error(500, 'Get Friends - ID', err);
  }
};

const getFriendsSocketsById = async id => {
  try {
    const onlineFriends = await User.findById(id).populate({ path: 'friends', model: 'User' });
    const { friends } = onlineFriends;
    if (!friends || friends.length <= 0) return [];
    // console.log('online friends: ', friends);
    return friends.filter(friend => friend.socketId).map(friend => friend.socketId);
  } catch (err) {
    throw new Error(500, 'Get Friends Sockets - ID', err);
  }
};

const deleteFriends = async id => {
  const resp = await User.findByIdAndUpdate(id, { friends: [] });
  console.log('deleting friends', resp);
};

/**CHATROOM METHODS */

const getChatsIdsById = async (userId, limit = 50, skip = 0) => {
  try {
    const data = await User.findById(userId, 'chatrooms', { limit, skip, sort: 'desc' });
    return data.chatrooms;
  } catch (err) {
    throw new Error(500, 'Get Chats - ID', err);
  }
};

const addChatById = async (userId, chatId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { chatrooms: chatId } },
      { new: true }
    );
    console.log(user, ' has been assigned a room');
    return user;
  } catch (err) {
    throw new Error(500, 'Add Chats - ID', err);
  }
};

const clearChatrooms = async userId => {
  const { id } = await User.findByIdAndUpdate(userId, { chatrooms: [] }, { new: true });
  console.log(`User ${id} chatroom deleted for user`, userId);
};
// const addInvitationById = async (userId, invitationId) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $addToSet: { pendingInvitations: invitationId } },
//       { new: true }
//     );
//     console.log('User Updated: ', updatedUser);
//   } catch (err) {
//     throw new Error(500, 'Add Invitation - ID', err);
//   }
// };

// const removeInvitation = async (userId, invitationId) => {
//   try {
//     const data = await User.findByIdAndUpdate(
//       userId,
//       { $pull: { pendingInvitations: invitationId } },
//       { new: true }
//     );
//   } catch (err) {
//     throw new Error(500, 'Remove Invitation - ID', err);
//   }
// };

// add avatar
const addAvatar = async (userId, avatarURL) => {
  const user = await User.findByIdAndUpdate(userId, { avatar: avatarURL }, { new: true });
  console.log(' new User Avatar: ', user.avatar);
};

const getAvatar = async userId => {
  const user = await User.findById(userId);
  return user.avatar;
};

module.exports = {
  createUser,
  addChatById,
  addFriend,
  checkFriendship,
  getByEmail,
  getById,
  getFriendsById,
  getFieldById,
  getAssociatedUserByCode,
  setSocketIdById,
  clearSocketId,
  getFriendsSocketsById,
  getAllUsers,
  getFriendsFieldsById,
  getChatsIdsById,
  removeUser,
  clearChatrooms,
  // addInvitationById,
  // removeInvitation,
  addAvatar,
  getAvatar,
  searchByName,
  deleteFriends,
};
