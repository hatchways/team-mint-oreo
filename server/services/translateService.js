const projectId = 'arctic-diode-268719';
const { Translate } = require('@google-cloud/translate').v2;
// const dotenv = require("dotenv").config()

const translateLang = async (originalText, incomingLang, language) => {
  try {
    // Instantiates a client
    const translate = new Translate();

    if (incomingLang !== language) {
      const options = {
        from: incomingLang,
        to: language,
      };
      const [translation] = await translate.translate(originalText, options);
      return translation;
    }
    return originalText;
  } catch (err) {
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
