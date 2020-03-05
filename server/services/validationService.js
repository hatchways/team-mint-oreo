const Error = require('../utils/Error');

const validatePasswords = (password, passwordConfirm) => {
  if(password !== passwordConfirm) throw new Error(401, "Passwords don't match");
  if(password.length < 6) throw new Error(401, 'Password must have minimum length of 6');
}

const validateCredentials = (email, password) => {
  let isValid = true;
  if (!email.length || !password.length) isValid = false;
  const splitEmail = email.split('');
  if (!splitEmail.includes('@') || !splitEmail.includes('.')) isValid = false;
  if (!isValid) throw new Error(401, 'Invalid Credentials');
};

module.exports = {
  validatePasswords,
  validateCredentials
};
