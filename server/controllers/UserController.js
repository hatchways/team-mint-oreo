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

const addChatById = async (userId, chatId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { chatrooms: chatId } },
      { new: true }
    );
  } catch (err) {
    throw new Error(500, 'Add Chats - ID', err);
  }
};

const addFriend = async (userId, friendId) => {
  try {
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

const addInvitationById = async (userId, invitationId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { pendingInvitations: invitationId } },
      { new: true }
    );
    console.log('User Updated: ', updatedUser);
  } catch (err) {
    throw new Error(500, 'Add Invitation - ID', err);
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

const getAllUsers = () => {
  return User.find();
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

const getFriendsSocketsById = async id => {
  try {
    const onlineFriends = await User.findById(id).populate({ path: 'friends', model: 'User' });
    const { friends } = onlineFriends;
    if (!friends || friends.length <= 0) return [];
    console.log('online friends: ', friends);
    return friends.filter(friend => friend.socketId).map(friend => friend.socketId);
  } catch (err) {
    throw new Error(500, 'Get Friends Sockets - ID', err);
  }
};

const getChatsById = async (id, limit = 50, skip = 0) => {
  try {
    const data = await User.findById(id, 'chatrooms', { limit, skip, sort: 'desc' });
    return data.chatrooms;
  } catch (err) {
    throw new Error(500, 'Get Chats - ID', err);
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

const setSocketIdById = async (userId, socketId) => {
  try {
    const data = await User.findByIdAndUpdate(userId, { socketId }, { new: true });
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

const removeInvitation = async (userId, invitationId) => {
  try {
    const data = await User.findByIdAndUpdate(
      userId,
      { $pull: { pendingInvitations: invitationId } },
      { new: true }
    );
  } catch (err) {
    throw new Error(500, 'Remove Invitation - ID', err);
  }
};

module.exports = {
  createUser,
  addChatById,
  addInvitationById,
  addFriend,
  getByEmail,
  getById,
  getFriendsById,
  getChatsById,
  getFieldById,
  setSocketIdById,
  clearSocketId,
  getFriendsSocketsById,
  getAllUsers,
  removeInvitation,
};
