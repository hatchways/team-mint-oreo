const socketio = require('socket.io');
const db = require('../controllers');
const { cache } = require('../utils/Cache');

/* SOCKET METHODS */

// On Login---------------------------------------------
const registerSocketId = (socket, userId) => {
  db.user.setSocketIdById(userId, socket.id);
};

const joinChatrooms = async (socket, userId) => {
  const chatroomList = await db.user.getChatsById(userId);
  if (!chatroomList || !chatroomList.length) return;
  chatroomList.forEach(room => socket.join(room));
};

const notifyFriends = async (socket, userId) => {
  const friendSocketList = await db.user.getFriendsSocketsById(userId);
  if (!friendSocketList || !friendSocketList.length) return;
  friendSocketList.forEach(friend => socket.to(friend).emit('userOnline', userId));
};

// On send message ------------------------------------------------------------
const cacheActiveChatInfo = msgObject => {
  // const {chatId, }
  // cache info here
};

const translateMessage = async msgObject => {
  // ⚠️ check cache for active chat languages
  const { text } = msgObject;
  const idAndLanguageList = await db.chatroom.getLanguagesAndIdsInChatroom(msgObject.chatId);

  //  ⚠️ filter out same language for translation
  const translationAPI = { translate: (x, y) => x };
  const translatedText = await Promise.all(
    idAndLanguageList.map(({ language }) => translationAPI.translate(text, language))
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

    socket.on('login', userId => {
      console.log('login ping');
      registerSocketId(socket, userId);
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
