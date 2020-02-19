const flattenArray = array => {
  return array.reduce((a, b) => {
    return [...a, ...b];
  }, []);
};

const replaceSocketIdWithStatus = array => {
  return array.map(item => {
    const { socketId, _id, email, displayName } = item;
    const newObject = { _id, email, displayName, isOnline: !!socketId };
    return newObject;
  });
};

const initialChatroomFetch = (chatIds, promiseResult) => {
  const result = promiseResult.map((chatroom, i) => {
    const usersWithOnlineStatus = replaceSocketIdWithStatus(chatroom);
    return { chatId: chatIds[i], users: usersWithOnlineStatus };
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
