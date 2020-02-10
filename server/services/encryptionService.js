const bcrypt = require('bcrypt');

export default {
  encrypt: async (plaintextPassword) => {
    try {
      const SALT_ROUNDS = 10;
      const hashedPassword = await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
      return hashedPassword;
    } catch (error) {
      return { error };
    }
  },
  decrypt: async (plaintextPassword, hashedPassword) => {
    try {
      const match = await bcrypt.compare(plaintextPassword, hashedPassword);
      return match;
    } catch (error) {
      return { error };
    }
  },
};
