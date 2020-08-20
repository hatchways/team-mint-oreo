const db = require('../controllers');
const { cache } = require('../utils/Cache');
const translateService = require('../services/translateService');

const getLanguageList = async chatId => {
  try {
    // const list = cache.get(chatId) || (await db.chatroom.getLanguages(chatId));
    const list = await db.chatroom.getLanguages(chatId);
    cache.set(chatId, list);
    return list;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new TypeError(`getLanguageList:${err.message}`, 400);
    }
    throw new Error(500, 'Internal Server Error at getLanguageList()', err);
  }
};

const translateMessage = async ({ userId, language, chatId, originalText }) => {
  try {
    const languageList = await getLanguageList(chatId);
    const incomingLang = await db.user.getUserLanguage(userId);

    const translatedText = await Promise.all(
      // languageList.map(language => translateService.translateLang(originalText, language))
      languageList.map(language =>
        translateService.translateLang(originalText, incomingLang, language)
      )
    );

    // returns an object with the shape {language: translatedText}
    const idTranslationMap = languageList.reduce(
      (a, language, i) => ({ ...a, [language]: translatedText[i] }),
      {}
    );

    console.log('language map: ', idTranslationMap);
    return idTranslationMap;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new TypeError(`translateMessage:${err.message}`, 400);
    }
    throw new Error(500, 'Internal Server Error at translateMessage()', err);
  }
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
