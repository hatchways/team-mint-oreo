const express = require('express');
const bcrypt = require('../services/bcryptService');
const db = require('../controllers');
const jwt = require('../services/jwtService');
const { isAuthorized } = require('../middleware/isAuthorized');
const { validateCredentials } = require('../services/validationService');
const format = require('../services/formatDataService');

const Error = require('../utils/Error');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, language } = req.body;
  validateCredentials(email, password);
  const hashedPassword = await bcrypt.encrypt(password);
  const { id = null } = await db.user.createUser({ email, password: hashedPassword, language });
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
      .json({
        success: true,
        status: 200,
        id,
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

// WORK AFTER COMING BACK
router.get('/invitation/:id', async (req, res) => {
  try {
    const { userId } = res.locals;
    console.log(userId);
    const dbUser = await db.user.getById(userId);
    const updatedInvitation = await db.invitation.updateToUser(req.params.id, dbUser.email);
    return res.status(200).json({
      success: true,
      data: updatedInvitation,
    });
  } catch (err) {
    return res.status(err.status).json({
      error: err.message,
    });
  }
});

router.get('/data', isAuthorized, async (req, res) => {
  const { userId } = res.locals;
  const { getChatsIdsById, getFriendsFieldsById, getFieldById } = db.user;
  const { email } = await getFieldById('email', userId);
  const { displayName, language } = await getFieldById('displayName language', userId);
  // const avatar = await getFieldById('avatar', userId); // TODO

  // TAB PANEL INFO NEEDED?
  // When friend is clicked, chatroom searches for that userDM
  // If it doesnt exist, retrieve from database
  // user language -- update global state

  // CHATROOM TAB PANEL:
  // get all user chat Ids
  // use Id's to get members of chat
  // return to frontend chatId, isDM, userInfo: {displayName, id, isOnline, avatar}, lastActivity: {<userId> : <timestamp>}

  // FRIENDS TAB PANEL
  // get all friends: {displayName, isOnline, id, avatar }
  // should also contain the dm chat id

  // INVITATION TAB PANEL
  // (email) search for invitations
  const data = await Promise.all([
    getChatsIdsById(userId),
    getFriendsFieldsById(['displayName', 'socketId', 'id', 'avatar'], userId),
    db.invitation.getInvitations(email),
  ]);

  const [chatroomIds, friendsData, invitationData] = data;

  const chatroomsWithUsers = await Promise.all(
    chatroomIds.map(id => {
      return db.chatroom.getChatroomById(id, {
        select: ['displayName', 'id', 'socketId', 'avatar'],
      });
    })
  );

  const friendsDmIds = await Promise.all(
    friendsData.map(friend => {
      return db.chatroom.getDmIdOfUsers(userId, friend.id);
    })
  );

  console.log('FRIENDS DM IDS', friendsDmIds);

  const chatrooms = format.chatroomData(chatroomsWithUsers);
  const friends = format.friendsData(friendsData, friendsDmIds);

  res.status(200).json({
    userId,
    language,
    displayName,
    // avatar,
    chatrooms,
    friends,
    invitations: invitationData,
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
