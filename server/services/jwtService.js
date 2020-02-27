const JWTsecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const sign = async userData => {
  try {
    const token = await jwt.sign(userData, JWTsecret, { expiresIn: '180d' });
    return token;
  } catch (err) {
    console.error('token sign error', err);
    throw new Error({ code: 500 });
  }
};

const verify = async encryptedToken => {
  try {
    const { id } = await jwt.verify(encryptedToken, process.env.JWT_SECRET);
    return id;
  } catch (err) {
    console.error('token decrypt error', err);
  }
};

module.exports = {
  sign,
  verify,
};
