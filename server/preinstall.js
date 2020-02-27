const fs = require('fs');

console.log('env google config:', process.env.GOOGLE_CONFIG);
fs.writeFileSync('./google-credentials-heroku.json', process.env.GOOGLE_CONFIG, err => {});
