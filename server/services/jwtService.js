const JWTsecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

module.exports = {
  sign: async (userData) => {
    try {
      const token = await jwt.sign(userData, JWTsecret, {expiresIn: "180d"});
      return token
    }catch (err){
      console.error('token sign error', err)
      return err;
    }
};
