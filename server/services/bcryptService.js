const bcrypt = require('bcrypt');

const encrypt = async plaintextPassword => {
  try {
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    return { error };
  }
};

const checkPassword = async (plaintextPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plaintextPassword, hashedPassword);
    return match;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  encrypt,
  checkPassword,
};
