const db = require('../controllers');
const formatData = require('../services/formatDataService');

const acceptInvitation = async (userId, friendId) => {
  await db.user.addFriend(userId, friendId);
};

const updateUserChatroom = async (userIds = [], chatId) => {
  try {
    const updatedUserInfos = await Promise.all(
      userIds.map(userId => {
        return db.user.addChatById(userId, chatId);
      })
    );
    console.log('Updated User List: ', updatedUserInfos);
  } catch (err) {
    throw new Error(500, 'update user chatroom', err);
  }
};

const buildReturnObject = (
  userObject,
  { newChatroom, usersWithOnlineStatus, invitationId },
  otherUserInfo
) => {
  const [formattedFriend] = formatData.convertSocketIdToStatus([otherUserInfo]);
  const friendWithDmInfo = {
    ...formattedFriend,
    dmChatId: newChatroom._id.toString(),
  };
  const chatroomWithAvatar = formatData.addAvatarToDMChat(newChatroom, userObject._id.toString());

  const chatroomWithAvatarInfo = {
    ...chatroomWithAvatar,
    chatId: newChatroom._id.toString(),
    users: usersWithOnlineStatus,
    unreadMessages: 0,
  };

  const result = {
    invitationId,
    friendWithDmInfo,
    chatroomWithAvatarInfo,
  };

  return result;
};

const accept = async (userId, friendId, invitationId) => {
  try {
    await Promise.all([
      acceptInvitation(userId, friendId),
      db.invitation.deleteInvitation(invitationId),
    ]);

    // Automatically creates a chatroom, and assign users in there
    const newChatroomId = await db.chatroom.createChatroom([userId, friendId]);
    console.log(newChatroomId);
    // adds chatroom ID to each user's chatroom list
    await updateUserChatroom([userId, friendId], newChatroomId);

    const values = await Promise.all([
      db.user.getById(userId),
      db.user.getById(friendId),
      db.chatroom.getChatroomById(newChatroomId),
    ]);

    let [userInfo, friendInfo, newChatroom] = values;
    newChatroom = newChatroom.toObject();
    const usersWithOnlineStatus = formatData.formatChatroomUsers(
      newChatroom.users,
      newChatroom.activityMap
    );
    const sharedData = { newChatroom, usersWithOnlineStatus, invitationId };
    const returnToUser = buildReturnObject(userInfo, sharedData, friendInfo);
    const returnToInviter = buildReturnObject(friendInfo, sharedData, userInfo);

    return {
      returnToInviter,
      returnToUser,
      socketIds: { user: userInfo.socketId, inviter: friendInfo.socketId },
      chatId: newChatroom._id,
    };
  } catch (err) {
    console.error(err);
  }
};

const reject = invitationId => {
  try {
    db.invitation.deleteInvitation(invitationId);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { accept, reject };
