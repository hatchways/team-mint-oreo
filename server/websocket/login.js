const db = require('../controllers');

const registerSocketId = (socket, userId) => {
  db.user.setSocketIdById(userId, socket.id);
};

const joinChatrooms = async (socket, userId) => {
  const chatroomList = await db.user.getChatsIdsById(userId);

  // No chatrooms available
  if (!chatroomList || chatroomList.length <= 0) {
    console.log('No chatrooms available yet');
    return;
  }

  socket.join(chatroomList);
};

const notifyFriends = async (io, userId) => {
  const friendSocketList = await db.user.getFriendsSocketsById(userId);
  if (!friendSocketList || !friendSocketList.length) {
    console.log('No friends are online');
    return;
  }
  friendSocketList.forEach(friend => io.to(friend).emit('userOnline', { userId }));
};

module.exports = {
  registerSocketId,
  joinChatrooms,
  notifyFriends,
};
