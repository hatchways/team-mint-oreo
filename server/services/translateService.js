const projectId = 'arctic-diode-268719';
const { Translate } = require('@google-cloud/translate').v2;
// const dotenv = require("dotenv").config()

const translateLang = async (originalText, incomingLang, language) => {
  try {
      // Instantiates a client
      const translate = new Translate();

      console.log('incomingLang: ', translate.translate);
      const [translation] = await translate.translate(originalText, language);
      return translation;
  } catch(err) {
      console.error(err);
  }
};




const FAKETranslateLang = (x, y) => {
  console.log('FAKE TRANSLATION');
  return x;
};

module.exports = {
  translateLang,
  FAKETranslateLang,
};
