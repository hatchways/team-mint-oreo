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
}

const joinChatrooms = async (socket, userId) => {
  const chatroomList = await db.user.getChatsById(userId);

  // No chatrooms available
  if(!chatroomList || chatroomList.length <= 0) {
      console.log('No chatrooms available yet');
      return;
  }

  chatroomList.forEach(room => socket.join(room));
};

const addFriend = async (socket, userId, friendEmail) => {
    await db.user.addFriendByEmail(userId, friendEmail);
}

const notifyFriends = async (socket, userId) => {
  const friendSocketList = await db.user.getFriendsSocketsById(userId);
  if (!friendSocketList || !friendSocketList.length) {
      console.log('No friends are online');
      return;
  }
  friendSocketList.forEach(friend => socket.to(friend).emit('userOnline', userId));
};

// On send message ------------------------------------------------------------
const cacheActiveChatInfo = msgObject => {
  // const {chatId, }
  // cache info here
};

const translateMessage = async (msgObject) => {
  // ⚠️ check cache for active chat languages
  const { originalText, chatId } = msgObject;
  const idAndLanguageList = await db.chatroom.getLanguagesAndIdsInChatroom(chatId);

  //  ⚠️ filter out same language for translation
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
  socket.to(outgoingMsg.chatId).emit('receiveMsg', outgoingMsg);
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

    socket.on('login', async ({userId, chatId, friendEmail}) => {
      console.log('login ping');
      await registerSocketId(socket, userId);
      await addChatroom(socket, userId, chatId);
      await addFriend(socket, userId, friendEmail);
      joinChatrooms(socket, userId);
      notifyFriends(socket, userId);
    });

    socket.on('sendMsg', async (msgObject) => {
      // ⚠️ Check if first message, if first message, create chatroom
      const translations = await translateMessage(msgObject);
      const outgoingMsg = { ...msgObject, translations, timestamp: Date.now() };
      sendMessage(socket, outgoingMsg);
      db.message.createMessage(outgoingMsg);
    });

    socket.on('friendRequestSent', () => {});
    socket.on('friendRequestReceived', () => {});

    socket.on('friendRequestAccepted', () => {});

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
