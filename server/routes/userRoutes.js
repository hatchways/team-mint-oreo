const express = require('express');
const bcrypt = require('../services/bcryptService');
const db = require('../controllers');
const jwt = require('../services/jwtService');
const { isAuthorized } = require('../middleware/isAuthorized');
const { validateCredentials } = require('../services/validationService');

const Error = require('../utils/Error');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    validateCredentials(email, password);
    const hashedPassword = await bcrypt.encrypt(password);
    const dbResponse = await db.user.createUser({ email, password: hashedPassword });
    console.log('dbResponse', dbResponse);
    const { id = null } = dbResponse;
    if (id) res.sendStatus(201);
  } catch (error) {
    res.status(400).json({
      error: {
        message: 'Bad Request',
      },
    });
  }
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
      .json({
        success: true,
        status: 200,
        userData,
      });
  } catch (err) {
    console.log(err);
    res.sendStatus(err.status || 500);
  }
});

router.get('/verify', async (req, res) => {
  const { userId } = res.locals;
  const dbUser = await db.user.getById(userId);
  if (!dbUser) res.clearCookie('user');
  res.json({ userId });
});

router.get('/getUser', async (req, res) => {
  const { userId } = res.locals;
  const dbUser = await db.user.getById(userId);
  console.log('/find/userid', dbUser);

  res.json(dbUser);
});

router.get('/data', isAuthorized, async (req, res) => {
  const { userId } = res.locals;
  const { getChatsById, getFriendsById, getFieldById } = db.user;
  const email = await getFieldById('email', userId);
  const displayName = await getFieldById('displayName', userId);
  // const avatar = await getFieldById('avatar', userId); // TODO

  const data = await Promise.all([
    getChatsById(userId),
    getFriendsById(userId),
    db.invitation.getInvitations(email),
  ]);

  const [chats, friends, invitations] = data;
  console.log(data);
  res.status(200).json({
    id: userId,
    displayName,
    // avatar,
    chats,
    friends,
    invitations,
  });
});

router.get('/logout', async (req, res) => {
  res.clearCookie('user').end();
});

router.get('/test', async (req, res) => {
  console.log('************************');
  console.log('***TEST RESULTS HERE****');
  console.log('************************');

  // seedService.createUsers();
  // const users = await seedService.getAllUsers();
  // console.log(users, users.length);
  // for (let i = 0; i <= users.length / 2; i++) {
  //   const random = Math.floor(Math.random() * users.length);
  //   const { id } = db.chatroom.createChatroom([users[random].id, users.pop().id]);
  //   console.log('new chat id', id);
  // }

  console.log('************************');
  console.log('***TEST RESULTS HERE****');
  console.log('************************');
});

module.exports = router;
