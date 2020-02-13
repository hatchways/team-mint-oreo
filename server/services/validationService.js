const Error = require('../utils/Error');

const validateCredentials = (email, password) => {
  let isValid = true;
  if (!email.length || !password.length) isValid = false;
  const splitEmail = email.split('');
  if (!splitEmail.includes('@') || !splitEmail.includes('.')) isValid = false;
  if (!isValid) throw new Error(401, 'Invalid Credentials');
};

module.exports = { validateCredentials };
