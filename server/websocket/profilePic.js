const db = require('../controllers');

const propogateToFriends = async (socket, userId, profilePic) => {
  const friendSocketList = await db.user.getFriendsSocketsById(userId);
  console.log(`${userId} changed pic to ${profilePic}`);
  if (!friendSocketList || !friendSocketList.length) {
    console.log('No friends are online');
    return;
  }
  friendSocketList.forEach(friend =>
    socket.to(friend).emit('updateFriendProfilePic', { FriendId: userId, ProfilePic: profilePic })
  );
};

module.exports = { propogateToFriends };
