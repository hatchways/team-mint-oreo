const router = require('express').Router();
const db = require('../controllers');
const format = require('../services/formatDataService');

router.get('/messages/:chatId', async (req, res) => {
  const { chatId } = req.params;
  const messages = await db.message.getAllByChatId(chatId);
  const sortedMessages = format.messagesData(messages);
  res.status(200).json({ messages: sortedMessages });
});

router.get('/data/:chatId', async (req, res) => {
  const { chatId } = req.params;
  const chatroom = await db.chatroom.getChatroomById(chatId, {
    selectFromUsers: ['displayName', 'id', 'socketId', 'avatar'],
  });
  res.status(200).json(chatroom);
});

router.post('/new', async (req, res) => {
  const { userIds } = req.body; // in form of array
  const chatId = await db.chatroom.createChatroom(userIds);

  // TODO connect DB to chatroom
  res.json({ chatId });
});

router.put('/update/activity', async (req, res) => {
  const { activeChatId: chatId, userId } = req.body;
  console.log('update activity', chatId, userId);
  await db.chatroom.updateLastTimeVisited(userId, chatId);
  res.status(200).json({});
});

module.exports = router;
