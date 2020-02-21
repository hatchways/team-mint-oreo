const projectId = 'arctic-diode-268719';
const  { Translate } = require('@google-cloud/translate').v2;
// const dotenv = require("dotenv").config()

const translateLang = async (originalText, language) => {
    // Instantiates a client
    const translate = new Translate();

    // Translates some text into Russian
    const [translation] = await translate.translate(originalText, language);
    return translation;
}

module.exports = {
    translateLang
}