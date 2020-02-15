const db = require('../controllers');

const registerSocketId = (socket, userId) => {
  db.user.setSocketIdById(userId, socket.id);
};

const joinChatrooms = async (socket, userId) => {
  const chatroomList = await db.user.getChatsById(userId);

  // No chatrooms available
  if (!chatroomList || chatroomList.length <= 0) {
    console.log('No chatrooms available yet');
    return;
  }

  chatroomList.forEach(room => socket.join(room));
};
const notifyFriends = async (socket, userId) => {
  const friendSocketList = await db.user.getFriendsSocketsById(userId);
  if (!friendSocketList || !friendSocketList.length) {
    console.log('No friends are online');
    return;
  }
  friendSocketList.forEach(friend => socket.to(friend).emit('userOnline', userId));
};

module.exports = {
  registerSocketId,
  joinChatrooms,
  notifyFriends,
};
