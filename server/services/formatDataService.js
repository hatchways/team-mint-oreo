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

const chatroomPromiseToObject = (chatIds, promiseResult) => {
  const result = promiseResult.map((chatroom, i) => {
    const removedSockets = replaceSocketIdWithStatus(chatroom);
    return { chatId: chatIds[i], users: removedSockets };
  });

  return result;
};

module.exports = {
  replaceSocketIdWithStatus,
  flattenArray,
  chatroomPromiseToObject,
};
