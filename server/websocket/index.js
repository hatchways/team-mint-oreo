const uuidv4 = require('uuid/v4');
const socketio = require('socket.io');
const db = require('../controllers');
const onLogin = require('./login');
const onSend = require('./sendMsg');
const onFriendReq = require('./friendRequest');
const onProfilePic = require('./profilePic');
const mailService = require('../services/mailService');

/* SOCKET METHODS */

const acceptInvitation = async (socket, userId, friendId) => {
  await db.user.addFriend(userId, friendId);
};

const updateUserChatroom = async (userIds, chatId) => {
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
      onLogin.notifyFriends(socket, userId);
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
      const translations = await onSend.translateMessage(msgObject);
      const outgoingMsg = {
        ...msgObject,
        translations,
        timestamp: Date.now(),
      };
      const { _id } = await db.message.createMessage(outgoingMsg);
      onSend.sendMessage(io, { ...outgoingMsg, _id });
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

        /* Maybe convert the userId into email? */
        /* Or we can possibly send the whole User query to fromUser & toUser
                that was returned from mongo */

        // This socket identifies from who, to who, and the identifier of invitation itself

        // TODO: need to search for socketID of toUser<email>
        socket.to(toUser).emit('friendRequestReceived', {
          fromUser,
          toUser,
          invitation: newInvitation.id,
        });
      } catch (err) {
        // Error will occur if the user tries to add duplicate
        // invitation, or internal server error
        console.error(err);
      }
    });
    // socket.on('friendRequestReceived', () => {});

    socket.on('friendRequestAccepted', async ({ userId, friendId, invitationId }) => {
      try {
        await acceptInvitation(socket, userId, friendId);
        db.invitation.deleteInvitation(invitationId);

        // Automatically creates a chatroom, and assign users in there
        const newChatRoomId = await db.chatroom.createChatroom([userId, friendId]);
        console.log(newChatRoomId);
        await updateUserChatroom([userId, friendId], newChatRoomId);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('isTyping', (userId, chatId) => {
      socket.to(chatId).emit('isTyping', { userId });
    });
    socket.on('endTyping', (userId, chatId) => {
      socket.to(chatId).emit('endTyping', { userId });
    });

    socket.on('searching', () => {});

    socket.on('test', () => {
      console.log('Connected sockets');
    });
    socket.on('disconnect', async reason => {
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
