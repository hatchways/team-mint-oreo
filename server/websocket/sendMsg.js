const db = require('../controllers');
const { cache } = require('../utils/Cache');

const getLanguageList = async chatId => {
  const list = cache.get(chatId) || (await db.chatroom.getLanguages(chatId));
  cache.set(chatId, list);
  return list;
};

const translateMessage = async ({ userId, language, chatId, originalText }) => {
  // id and language list is an array of objects: {id, language}
  const languageList = await getLanguageList(chatId);
  const translationAPI = { translate: (x, y) => x };
  const translatedText = await Promise.all(
    languageList.map(language => translationAPI.translate(originalText, language))
  );

  // returns an object with the shape {language: translatedText}
  const idTranslationMap = languageList.reduce(
    (a, language, i) => ({ ...a, [language]: translatedText[i] }),
    {}
  );

  return idTranslationMap;
};

const sendMessage = async (io, outgoingMsg) => {
  // assuming outgoingMsg inherits Model Message
  io.to(outgoingMsg.chatId).emit('receiveMsg', outgoingMsg);
};

module.exports = {
  getLanguageList,
  translateMessage,
  sendMessage,
};
