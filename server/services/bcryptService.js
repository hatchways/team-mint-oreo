const bcrypt = require('bcrypt');
const Error = require('../utils/Error');

const encrypt = async plaintextPassword => {
  try {
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
    return hashedPassword;
  } catch (err) {
    throw new Error(500, 'Password Encryption failed', err);
  }
};

const checkPassword = async (plaintextPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plaintextPassword, hashedPassword);
    if (!match) throw new Error(401, 'Password incorrect');
  } catch (err) {
    throw new Error(500, 'Password compare failed', err);
  }
};

module.exports = {
  encrypt,
  checkPassword,
};
