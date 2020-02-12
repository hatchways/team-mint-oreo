const express = require('express');
const bcrypt = require('../services/bcryptService');
const db = require('../controllers');
const jwt = require('../services/jwtService');
const { isAuthorized } = require('../middleware/isAuthorized');
const { validateCredentials } = require('../services/validationService');
const Error = require('../utils/Error');

// const { promiseWrapper } = require('../utils/promiseWrapper');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  validateCredentials(email, password);
  const hashedPassword = await bcrypt.encrypt(password);
  const { id = null } = await db.user.createUser({ email, password: hashedPassword });
  if (id) res.sendStatus(201);
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    validateCredentials(email, password);
    const userData = await db.user.getByEmail(email);
    if (!userData) throw new Error(401, 'User not found');
    await bcrypt.checkPassword(password, userData.password);
    const { id } = userData;
    const encodedToken = await jwt.sign({ id });

    res
      .cookie('user', encodedToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 180, // 6months
        // secure: true
        signed: true,
      })
      .sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(err.code || 500);
  }
});

router.get('/verify', (req, res) => {
  res.send(!!res.locals.userId);
});

router.get('/data', isAuthorized, async (req, res) => {
  const { id } = res.locals;
  const { getChatsById, getFriendsById, getFieldById } = db.user;
  const email = await getFieldById('email', id);
  const data = await Promise.all([
    getChatsById(id),
    getFriendsById(id),
    db.invitation.getInvitations(email),
  ]);
  console.log(data);
  res.status(200).json({ data });
});

router.get('/logout', isAuthorized, async (req, res) => {
  res.clearCookie().end();
});

router.get('/test', async (req, res) => {
  console.log('hello**********');
  console.log(res.locals.userId);
  const result = await db.user.getByEmail('testmail1');
  const { _id } = result;
  console.log(result, _id);
  res.redirect('http://localhost:3000/dashboard');
});

module.exports = router;
