const flattenArray = array => {
  return array.reduce((a, b) => {
    return [...a, ...b];
  }, []);
};

const replaceSocketIdWithStatus = userList => {
  return userList.map(user => {
    const { socketId, _id, email, displayName, avatar } = user;
    const userObject = { _id, email, displayName, avatar, isOnline: !!socketId };
    return userObject;
  });
};

const initialChatroomFetch = chatroomData => {
  /**
   * This function should take an array of chatroom objects, containing their
   * status as a DM chatroom, their ChatID, and the user's object.
   * The user object only needs the following info:
   *  - _id
   *  - displayName
   *  - isOnline (ie socketID)
   *  - avatar
   *  - In the future, lastActivity and possibly messages
   */

  const result = chatroomData.map(chatroom => {
    // Replaces the socketId with the key 'isOnline : <boolean>'
    const usersWithOnlineStatus = replaceSocketIdWithStatus(chatroom.users);
    // isDM needs to be explicit since ...rest contains db methods
    return { isDM: chatroom.isDM, chatId: chatroom['_id'], users: usersWithOnlineStatus };
  });
  return result;
};

const orderByLatestLast = array => {
  const sortedArray = array.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  return sortedArray;
};

module.exports = {
  replaceSocketIdWithStatus,
  flattenArray,
  initialChatroomFetch,
  orderByLatestLast,
};
