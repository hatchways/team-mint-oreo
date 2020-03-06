const uuidv4 = require('uuid/v4');
const socketio = require('socket.io');
const db = require('../controllers');
const onLogin = require('./login');
const onSend = require('./sendMsg');
const onFriendReq = require('./friendRequest');
const onProfilePic = require('./profilePic');
const mailService = require('../services/mailService');
const onSearch = require('./search');
const formatData = require('../services/formatDataService');

const updateUserChatroom = async (userIds = [], chatId) => {
  try {
    const updatedUserInfos = await Promise.all(
      userIds.map(userId => {
        return db.user.addChatById(userId, chatId);
      })
    );
    console.log('Updated User List: ', updatedUserInfos);
  } catch (err) {
    throw new Error(500, 'update user chatroom', err);
  }
};

/* SOCKET HANLDER */

const handleSocket = server => {
  const io = socketio.listen(server);
  io.on('connection', socket => {
    console.log(`${socket.id} has connected to the site.`);

    socket.on('login', async ({ userId }) => {
      console.log('login ping');
      onLogin.registerSocketId(socket, userId);
      onLogin.joinChatrooms(socket, userId);
      onLogin.notifyFriends(io, userId);
    });

    /**
     * Generate Message Translations, write message to DB,
     * propogate messages to other online users.
     *
     * listener triggered when user sends a message in a chat,
     * the function would need the following parameters. (use period)
     * @param {Object} msgObject              An object containing the message contents.
     * @param {String} msgObject.userId       String containing the user's Id.
     * @param {String} msgObject.chatId       String containing the id of the chat in which the message was sent
     * @param {String} msgObject.originalText String containing the original message that was sent
     * @param {Boolean} [msgObject.isPicture] Optional to specify whether or not a message is a picture to skip translations
     *
     * @return undefined
     */
    socket.on('sendMsg', async msgObject => {
      const { isPicture = false } = msgObject;
      // if it is a picture the originalText will be a url
      // no point translating that
      const translations = !isPicture ? await onSend.translateMessage(msgObject) : {};
      const outgoingMsg = {
        ...msgObject,
        translations,
      };
      const { _id, createdAt } = await db.message.createMessage(outgoingMsg);
      onSend.sendMessage(io, { ...outgoingMsg, _id, createdAt });
      db.chatroom.updateLastMessage(outgoingMsg.chatId);
    });

    socket.on('updateProfilePic', async ({ userId, profilePic }) => {
      onProfilePic.propogateToFriends(io, socket, userId, profilePic);
    });

    // current user is sending the friend an invitation request
    socket.on('friendRequestSent', async ({ fromUser, toUser }) => {
      // await addFriend(socket, userId, friendEmail);
      try {
        const invExists = await db.invitation.invitationExists(fromUser, toUser);
        const alreadyFriends = await db.user.checkFriendship(fromUser, toUser);
        // const invExists = false;
        // const alreadyFriends = false;

        // check for friendship or existing invitation
        // If it does, we don't send notification mail in a first place
        if (invExists || alreadyFriends) throw new Error('Invitation / Friend already registered');
        const randomId = uuidv4();
        mailService.sendInvitationEmail(fromUser, toUser, randomId, (err, isSent) => {
          if (err) throw err;
          if (isSent) console.log('Email successfully sent');
        });

        const newInvitation = await db.invitation.createInvitation(fromUser, toUser, randomId);
        console.log(newInvitation, ' has been created');
        // This socket identifies from who, to who, and the identifier of invitation itself

        // TODO: need to search for socketID of toUser<email>
        const values = await Promise.all([
          db.user.getByEmail(toUser),
          db.user.getByEmail(fromUser),
        ]);
        const [toUserInfo, fromUserInfo] = values;
        if (!toUserInfo.socketId) return;
        io.to(toUserInfo.socketId).emit('friendRequestReceived', {
          user: fromUserInfo,
          invitation: newInvitation,
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('friendRequestAccepted', async ({ userId, friendId, invitationId }) => {
      const { returnToUser, returnToInviter, socketIds, chatId } = await onFriendReq.accept(
        userId,
        friendId,
        invitationId
      );
      socket.join(chatId);
      io.to(socketIds.user).emit('requestAcceptDone', returnToUser);
      io.to(socketIds.inviter).emit('requestAcceptDone', returnToInviter);
    });

    socket.on('friendRequestRejected', async ({ userId, invitationId }) => {
      onFriendReq.reject(invitationId);
      socket.emit('requestDone', { id: invitationId });
    });

    socket.on('friendRequestPing', chatId => {
      socket.join(chatId);
    });

    socket.on('createGroupChat', async ({ hostUser, members }) => {
      try {
        const membersId = members.map(member => member._id);
        membersId.push(hostUser);
        const newChatRoomId = await db.chatroom.createChatroom(membersId);
        await updateUserChatroom(membersId, newChatRoomId);

        const newChatRoom = await db.chatroom.getChatroomById(newChatRoomId);
        const host = await db.user.getById(hostUser);
        const usersWithOnlineStatus = formatData.convertSocketIdToStatus(newChatRoom.users);
        const chatroomWithAvatar = formatData.addAvatarToDMChat(newChatRoom, hostUser);

        io.to(host.socketId).emit('groupChatCreated', {
          ...chatroomWithAvatar,
          chatId: newChatRoomId,
          users: usersWithOnlineStatus,
          unreadMessages: 0,
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('typingStatus', (userId, chatId, status) => {
      console.log(`${userId} is ${status ? '' : 'no longer '}typing`);
      io.to(chatId).emit('typingStatus', { userId, chatId, status });
    });

    socket.on('searching', async body => {
      const data = await onSearch.search(body);
      socket.emit('searchResult', { data, tab: body.tab });
    });

    socket.on('updateActivity', async (userId, activeChatId) => {
      console.log('ws: updateActivity received', activeChatId);
      io.to(activeChatId).emit('updateActivity', userId);
    });

    socket.on('disconnect', reason => {
      console.log(`${socket.id} has left the site. ${reason}`);
      db.user.clearSocketId(socket.id);
    });

    socket.on('reconnecting', () => {
      console.log('reconnecting socket..');
    });
  });
};

module.exports = {
  listen: handleSocket,
};
