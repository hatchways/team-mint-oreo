const db = require('../controllers');
const { cache } = require('../utils/Cache');

const getLanguageAndIdList = async chatId => {
  let list = cache.get(chatId);
  if (!list) list = await db.chatroom.getLanguagesAndIds(chatId);
  cache.set(chatId, list);
  return list;
};

const translateMessage = async msgObject => {
  const { originalText, chatId } = msgObject;
  // id and language list is an array of objects: {id, language}
  const idAndLanguageList = await getLanguageAndIdList(chatId);
  // remove sender from translation list
  idAndLanguageList.filter(pair => pair.id !== chatId);
  const translationAPI = { translate: (x, y) => x };
  const translatedText = await Promise.all(
    idAndLanguageList.map(({ language }) => translationAPI.translate(originalText, language))
  );

  // returns an object with the shape {userId: translatedText}
  const idTranslationMap = idAndLanguageList.reduce(
    (a, b, i) => ({ ...a, [b.id]: translatedText[i] }),
    {}
  );

  return idTranslationMap;
};

const sendMessage = async (socket, outgoingMsg) => {
  // assuming outgoingMsg inherits Model Message
  socket.to(outgoingMsg.chatId).emit('receiveMsg', outgoingMsg);
};

module.exports = {
  getLanguageAndIdList,
  translateMessage,
  sendMessage,
};
