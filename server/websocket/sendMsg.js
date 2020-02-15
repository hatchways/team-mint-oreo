const db = require('../controllers');
const { cache } = require('../utils/Cache');

const getLanguageAndIdList = async chatId => {
  let list = cache.get(chatId);
  if (!list) list = await db.chatroom.getLanguagesAndIds(chatId);
  cache.set(chatId, list);
  return list;
};

const translateMessage = async msgObject => {
  // ⚠️ check cache for active chat languages
  const { originalText, chatId } = msgObject;
  const idAndLanguageList = await getLanguageAndIdList(chatId);

  // remove sender from translation list
  idAndLanguageList.filter(pair => pair.id !== chatId);
  const translationAPI = { translate: (x, y) => x };
  const translatedText = await Promise.all(
    idAndLanguageList.map(({ language }) => translationAPI.translate(originalText, language))
  );

  // const translationAndIds = idAndLanguageList.map(({ id }, i) => ({ id, text: translatedText[i] }));
  const idTranslationMap = idAndLanguageList.reduce(
    (a, b, i) => ({ ...a, [b.id]: translatedText[i] }),
    {}
  );

  // ⚠️ cache translation
  return idTranslationMap;
};

const sendMessage = async (socket, outgoingMsg) => {
  socket.to('123').emit('receiveMsg', outgoingMsg);
};

module.exports = {
  getLanguageAndIdList,
  translateMessage,
  sendMessage,
};
