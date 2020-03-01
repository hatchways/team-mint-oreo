const router = require('express').Router();
const mongoose = require('mongoose');

const db = require('../controllers');
const { isAuthorized } = require('../middleware/isAuthorized');
const format = require('../services/formatDataService');
const { uploadMintPic, uploadSaltedPic, deletePic } = require('../aws/aws-utils');

const Error = require('../utils/Error');
const ValidationError = mongoose.Error.ValidationError;

router.get('/friends', async (req, res) => {
  const { userId } = res.locals;
  const friends = db.user.getFriendsFieldsById(['displayName', 'socketId', 'id', 'avatar'], userId);
  const dmIds = await Promise.all(
    friendsData.map(friend => {
      return db.chatroom.getDmIdOfUsers(userId, friend.id);
    })
  );

  const formattedFriends = format.friendsData(friends, dmIds);

  res.json({ friends: formattedFriends });
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

  const chatroomsWithUsers = await db.chatroom.getAllByChatIds(chatroomIds);

  const unreadMessages = await Promise.all(
    chatroomsWithUsers.map(chatroom => {
      return db.message.getUnreadCount(chatroom, userId);
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

  const chatrooms = format.chatroomData(chatroomsWithUsers, unreadMessages, userId);
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
    // to prevent storage overflow, deleting old avatars
    const oldPicURL = await db.user.getAvatar(userId);
    // convert old pic full URL into just picture data after the front url
    const oldPicInbucket = oldPicURL.replace('https://mint-oreo.s3.amazonaws.com/', '');
    console.log('old Pic URL', oldPicInbucket);
    try {
      await deletePic(oldPicInbucket);
    } catch (error) {
      console.log('deletion error:', error);
    }

    // we got the pic location now, time to update avatar
    const pic = req.body;
    const awsResult = await uploadSaltedPic(pic);
    const { Location: location } = awsResult;
    console.log('New Pic URL', location);
    db.user.addAvatar(userId, location);

    res.status(201).json({
      success: true,
      userId: userId,
      pic: location,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get('/delete', isAuthorized, async (req, res) => {
  console.log('deleting...');
  db.user.removeUser(res.locals.userId);
});

router.get('/getUser', async (req, res) => {
  const { userId } = res.locals;
  const dbUser = await db.user.getById(userId);
  console.log('/find/userid', dbUser);

  res.json(dbUser);
});

// WORK AFTER COMING BACK
// router.get('/invitation/:id', async (req, res) => {
//   try {
//     const { userId } = res.locals;
//     console.log(userId);
//     const dbUser = await db.user.getById(userId);
//     const updatedInvitation = await db.invitation.updateToUser(req.params.id, dbUser.email);
//     return res.status(200).json({
//       success: true,
//       data: updatedInvitation,
//     });
//   } catch (err) {
//     return res.status(err.status).json({
//       error: err.message,
//     });
//   }
// });

module.exports = router;
