const db = require('../controllers');

const propogateToFriends = async (io, socket, userId, profilePic) => {
  const friendSocketList = await db.user.getFriendsSocketsById(userId);
  console.log(`PFP change: ${userId} changed pic to ${profilePic}`);
  const { socketId } = await db.user.getById(userId);
  if (!friendSocketList || !friendSocketList.length) {
    console.log('No friends are online');
    return;
  }
  io.to(socketId).emit('updateOwnProfilePic', { profilePic });
  friendSocketList.forEach(friend =>
    socket.to(friend).emit('updateFriendProfilePic', { friendId: userId, profilePic })
  );
};

module.exports = { propogateToFriends };
