const flattenArray = array => {
  return array.reduce((a, b) => {
    return [...a, ...b];
  }, []);
};

const replaceSocketIdWithStatus = userList => {
  return userList.map(user => {
    const { socketId, _id, displayName, avatar } = user;
    const userObject = { _id, displayName, avatar, isOnline: !!socketId };
    return userObject;
  });
};

const chatroomData = (chatroomData, userId) => {
  /**
   * This function should take an array of chatroom objects, containing their
   * status as a DM chatroom, their ChatID, and the user objects.
   *
   * incoming ChatroomData looks as follows:
   * {
   * users: {<userObjects>},
   * id,
   * isDM,
   * activityMap,
   * }
   *
   * User only needs their own last activity
   *
   */

  chatroomData.sort((a, b) => {
    const firstTimestamp = a.lastMessageTimestamp || Date.parse(a.createdAt);
    const secondTimestamp = b.lastMessageTimestamp || Date.parse(b.createdAt);
    return secondTimestamp - firstTimestamp;
  });

  const result = chatroomData.map(chatroom => {
    // Replaces the socketId with the key 'isOnline : <boolean>'
    const usersWithOnlineStatus = replaceSocketIdWithStatus(chatroom.users);
    return {
      ...chatroom,
      chatId: chatroom._id,
      users: usersWithOnlineStatus,
    };
  });
  return result;
};

const friendsData = (friendsData, DmIds) => {
  const formattedFriends = replaceSocketIdWithStatus(friendsData);
  const friendsWithDmInfo = formattedFriends.map((friend, i) => ({
    ...friend,
    dmChatId: DmIds[i],
  }));
  return friendsWithDmInfo;
};

const invitationsData = (invitationsData, fromUserList) => {
  const invitationsList = invitationsData.map((invitation, i) => {
    return {
      invitation,
      user: fromUserList[i],
    };
  });
  console.log('invitationsList: ', invitationsList);
  return invitationsList;
};

const orderByLatestLast = array => {
  const sortedArray = array.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  return sortedArray;
};

const messagesData = messages => {
  const sortedMessages = orderByLatestLast(messages);
  return sortedMessages;
};

module.exports = {
  replaceSocketIdWithStatus,
  flattenArray,
  chatroomData,
  orderByLatestLast,
  friendsData,
  invitationsData,
  messagesData,
};
