const express = require('express');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const bcrypt = require('../services/bcryptService');
const db = require('../controllers');
const jwt = require('../services/jwtService');
const { isAuthorized } = require('../middleware/isAuthorized');
const { validateCredentials } = require('../services/validationService');
const format = require('../services/formatDataService');

const { uploadMintPic, uploadSaltedPic } = require('../aws/aws-utils');

const Error = require('../utils/Error');
const ValidationError = mongoose.Error.ValidationError;

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
      const { email, password, language, displayName } = req.body;
      validateCredentials(email, password);
      const hashedPassword = await bcrypt.encrypt(password);
      // associate a random invitation uuid to the newly created user
      const inviteCode = uuidv4();
      const { id = null } = await db.user.createUser({
        email,
        password: hashedPassword,
        language,
        displayName,
        avatar: '',
        inviteCode
      });
      if (id) res.status(201).json({ status: 201 });
  } catch(err) {
      return res.status(err.status).json({
          error: err.message
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
        id,
      });
  } catch (err) {
    console.error(err);
    return res.status(err.status).json({ error: err.message });
  }
});

router.get('/verify', async (req, res) => {
  const { userId } = res.locals;
  const dbUser = await db.user.getById(userId);
  if (!dbUser) res.clearCookie('user');
  res.status(200).json({ userId });
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
  const { displayName, language, avatar } = await getFieldById(
    'displayName language avatar',
    userId
  );

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
      return db.chatroom.getChatroomById(
        id,
        {
          selectFromUsers: ['displayName', 'id', 'socketId', 'avatar'],
        },
        userId
      );
    })
  );
  const friendsDmIds = await Promise.all(
    friendsData.map(friend => {
      return db.chatroom.getDmIdOfUsers(userId, friend.id);
    })
  );

  const fromUserList = await Promise.all(
    invitationData.map(invitation => {
      return db.user.getByEmail(invitation.fromUser);
    })
  );

  const unreadMessages = await Promise.all(
    chatroomsWithUsers.map(chatroom => {
      return db.message.getUnreadCount(chatroom._id, chatroom.lastActivity);
    })
  );

  // console.log('FRIENDS DM IDS', friendsDmIds);
  // console.log('FROM USER INFO ', fromUserList);

  const chatrooms = format.chatroomData(chatroomsWithUsers, unreadMessages);
  const friends = format.friendsData(friendsData, friendsDmIds);
  const invitations = format.invitationsData(invitationData, fromUserList);

  res.status(200).json({
    userId,
    email,
    language,
    displayName,
    avatar,
    chatrooms,
    friends,
    invitations,
  });
});

router.get('/avatar', async (req, res) => {
  try {
    const { userId } = res.locals;
    const { avatar } = await db.user.getFieldById('avatar', userId);
    res.status(200).json({ avatar });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get('/avatar/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { avatar } = await db.user.getFieldById('avatar', userId);
    res.status(200).json({ avatar });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post('/avatar', async (req, res) => {
  try {
    const { userId } = res.locals;
    const pic = req.body;
    const awsResult = await uploadSaltedPic(pic);
    const { Location: location } = awsResult;
    console.log('Pic URL', location);
    // we got the pic location now, time to update avatar
    db.user.addAvatar(userId, location);
    res.status(201).json({
      success: true,
      pic: location,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get('/logout', async (req, res) => {
  res.clearCookie('user').end();
});

router.get('/delete', isAuthorized, async (req, res) => {
  console.log('deleting...');
  db.user.removeUser(res.locals.userId);
});

module.exports = router;
