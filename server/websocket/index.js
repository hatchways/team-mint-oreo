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
const getLanguageAndIdList = async chatId => {
  let list = cache.get(chatId);
  if (!list) list = await db.chatroom.getLanguagesAndIds(chatId);
  cache.set(chatId, list);
  return list;
};

const translateMessage = async (msgObject, idLangaugeList) => {
  const { text, userId } = msgObject;
  // remove sender from translation list
  idLangaugeList.filter(pair => pair.id !== userId);
  const translationAPI = { translate: (x, y) => x };
  const translatedText = await Promise.all(
    idLangaugeList.map(({ language }) => translationAPI.translate(text, language))
  );
  // const translationAndIds = idLangaugeList.map(({ id }, i) => ({ id, text: translatedText[i] }));
  const idTranslationMap = idLangaugeList.reduce(
    (a, b, i) => ({ ...a, [b.id]: translatedText[i] }),
    {}
  );
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
      registerSocketId(socket, userId);
      joinChatrooms(socket, userId);
      notifyFriends(socket, userId);
    });

    socket.on('sendMsg', async msgObject => {
      const list = getLanguageAndIdList(msgObject.chatId);
      const translations = await translateMessage(msgObject, list);
      const outgoingMsg = { ...msgObject, translations, timestamp: Date.now() };
      sendMessage(socket, outgoingMsg);
      db.message.createMessage(outgoingMsg);
    });

    socket.on('friendRequestSent', (fromEmail, toEmail, toId) => {
      socket.to(toId).emit('friendRequestReceived');
      db.invitation.createInvitation(fromEmail, toEmail);
    });

    socket.on('friendRequestAccepted', fromEmail => {});
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
