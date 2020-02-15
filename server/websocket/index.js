const socketio = require('socket.io');
const db = require('../controllers');
const onLogin = require('./login');
const onSend = require('./sendMsg');

/* SOCKET METHODS */

// On Login---------------------------------------------

const addChatroom = async (socket, userId, chatId) => {
  await db.user.addChatById(userId, chatId);
  await db.chatroom.addUser(userId, chatId);
};

const acceptInvitation = async (socket, userId, friendId) => {
  await db.user.addFriend(userId, friendId);
};

/* SOCKET HANLDER */

const handleSocket = server => {
  const io = socketio.listen(server);
  io.on('connection', socket => {
    console.log(`${socket.id} has connected to the site.`);

    socket.on('login', async ({ userId, chatId }) => {
      console.log('login ping');
      onLogin.registerSocketId(socket, userId);
      onLogin.joinChatrooms(socket, userId);
      onLogin.notifyFriends(socket, userId);
      //  addChatroom(socket, userId, chatId);
    });

    socket.on('sendMsg', async msgObject => {
      // ⚠️ Check if first message, if first message, create chatroom
      const translations = await onSend.translateMessage(msgObject);
      const outgoingMsg = { ...msgObject, translations, timestamp: Date.now() };
      onSend.sendMessage(socket, outgoingMsg);
      db.message.createMessage(outgoingMsg);
    });

    // current user is sending the friend an invitation request
    socket.on('friendRequestSent', async ({ userId, friendEmail }) => {
      // await addFriend(socket, userId, friendEmail);
      try {
        const newInvitation = await db.invitation.createInvitation(userId, friendEmail);

        /* Maybe convert the userId into email? */
        /* Or we can possibly send the whole User query to fromUser & toUser
                that was returned from mongo */

        // This socket identifies from who, to who, and the identifier of invitation itself
        socket.to(friendEmail).emit('friendRequestReceived', {
          fromUser: userId,
          toUser: friendEmail,
          invitatioin: newInvitation.id,
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
        db.user.removeInvitation(userId, invitationId);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('isTyping', () => {});
    socket.on('endTyping', () => {});
    socket.on('searching', () => {});

    socket.on('test', () => {
      console.log('Connected sockets');
    });
  });

  io.on('disconnect', socket => {
    console.log(`${socket.id} has left the site.`);
    db.user.clearSocketId(socket.id);
  });
};

module.exports = {
  listen: handleSocket,
};
