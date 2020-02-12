const socketio = require('socket.io');
const userController = require('../controllers/UserController');
const chatController = require('../controllers/ChatroomController');
const messageController = require('../controllers/MessageController');
const { cache } = require('../utils/Cache');

/* SOCKET METHODS */

// On Login---------------------------------------------
const registerSocketId = (socket, userId) => {
  userController.setSocketIdById(userId, socket.id);
};

const joinChatrooms = async (socket, userId) => {
  const chatroomList = await userController.getChatsById(userId);
  if (!chatroomList || !chatroomList.length) return;
  chatroomList.forEach(room => socket.join(room));
};

const notifyFriends = async (socket, userId) => {
  const friendSocketList = await userController.getFriendsSocketsById(userId);
  if (!friendSocketList || !friendSocketList.length) return;
  friendSocketList.forEach(friend => socket.to(friend).emit('userOnline', userId));
};

// On send message ------------------------------------------------------------
const cacheActiveChatInfo = msgObject => {
  // const {chatId, }
  // cache info here
};

const translateMessage = async msgObject => {
  // check cache for active chat languages
  const { text } = msgObject;
  const idAndLanguageList = await chatController.getLanguagesndIdsInChatroom(msgObject.chatId);

  // filter out same language for translation

  const translationAPI = {};
  const translatedText = await Promise.all(
    idAndLanguageList.map(({ language }) => translationAPI.translate(text, language))
  );
  const translationAndIds = idAndLanguageList.map(({ id }, i) => ({ id, text: translatedText[i] }));
  return translationAndIds;
};

const sendMessage = async (socket, outgoingMsg) => {
  socket.to(outgoingMsg.chatId).emit('receiveMsg', outgoingMsg);
};

// User disconnects -----------------------------------------------------
const userDisconnect = socketId => {
  console.log(`${socketId} has left the site.`);
  userController.clearSocketId(socketId);
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
      const translations = await translateMessage(msgObject);
      cacheActiveChatInfo(msgObject, Object.keys(translations));
      const { userId, chatId, text } = msgObject;
      const outgoingMsg = {
        userId,
        chatId,
        translations, // translated message,
        originalText: text,
        timestamp: Date.now(),
      };
      sendMessage(socket, { ...msgObject, translations });
      messageController.createMessage(outgoingMsg);
    });

    socket.on('friendRequestReceived', () => {});

    socket.on('friendRequestAccepted', () => {});
  });

  io.on('disconnect', socket => {
    userDisconnect(socket.id);
  });
};

module.exports = {
  listen: handleSocket,
};
