const socketio = require('socket.io');
const db = require('../controllers');
const { cache } = require('../utils/Cache');

/* SOCKET METHODS */

// On Login---------------------------------------------
const registerSocketId = (socket, userId) => {
  db.user.setSocketIdById(userId, socket.id);
};

const addChatroom = async (socket, userId, chatId) => {
  await db.user.addChatById(userId, chatId);
  await db.chatroom.addUser(userId, chatId);
};

const joinChatrooms = async (socket, userId) => {
  const chatroomList = await db.user.getChatsById(userId);

  // No chatrooms available
  if (!chatroomList || chatroomList.length <= 0) {
    console.log('No chatrooms available yet');
    return;
  }

  chatroomList.forEach(room => socket.join(room));
};

const acceptInvitation = async (socket, userId, friendId) => {
  await db.user.addFriend(userId, friendId);
};

const notifyFriends = async (socket, userId) => {
  const friendSocketList = await db.user.getFriendsSocketsById(userId);
  if (!friendSocketList || !friendSocketList.length) {
    console.log('No friends are online');
    return;
  }
  friendSocketList.forEach(friend => socket.to(friend).emit('userOnline', userId));
};

// On send message ------------------------------------------------------------
const getLanguageAndIdList = async chatId => {
  let list = cache.get(chatId);
  if (!list) list = await db.chatroom.getLanguagesAndIds(chatId);
  cache.set(chatId, list);
  return list;
};

const translateMessage = async msgObject => {
  // ⚠️ check cache for active chat languages
  const { originalText, chatId } = msgObject;
  const idAndLanguageList = await getLanguageAndIdList(chatId);

  // remove sender from translation list
  idAndLanguageList.filter(pair => pair.id !== chatId);
  const translationAPI = { translate: (x, y) => x };
  const translatedText = await Promise.all(
    idAndLanguageList.map(({ language }) => translationAPI.translate(originalText, language))
  );

  // const translationAndIds = idAndLanguageList.map(({ id }, i) => ({ id, text: translatedText[i] }));
  const idTranslationMap = idAndLanguageList.reduce(
    (a, b, i) => ({ ...a, [b.id]: translatedText[i] }),
    {}
  );

  // ⚠️ cache translation
  return idTranslationMap;
};

const sendMessage = async (socket, outgoingMsg) => {
  socket.to('123').emit('receiveMsg', outgoingMsg);
};

// User disconnects -----------------------------------------------------
const userDisconnect = socketId => {
  console.log(`${socketId} has left the site.`);
  db.user.clearSocketId(socketId);
};

/* SOCKET HANLDER */

const handleSocket = server => {
  const io = socketio.listen(server);
  io.on('connection', socket => {
    console.log(`${socket.id} has connected to the site.`);

    socket.on('login', async ({ userId, chatId }) => {
      console.log('login ping');
      await registerSocketId(socket, userId);
      await addChatroom(socket, userId, chatId);
      joinChatrooms(socket, userId);
      notifyFriends(socket, userId);
    });

    socket.on('sendMsg', async msgObject => {
      // ⚠️ Check if first message, if first message, create chatroom
      const translations = await translateMessage(msgObject);
      const outgoingMsg = { ...msgObject, translations, timestamp: Date.now() };
      sendMessage(socket, outgoingMsg);
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
    userDisconnect(socket.id);
  });
};

module.exports = {
  listen: handleSocket,
};
