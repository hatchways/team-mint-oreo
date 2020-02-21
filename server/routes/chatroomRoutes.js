const router = require('express').Router();
const db = require('../controllers');
const { orderByLatestLast } = require('../services/formatDataService');

router.get('/messages/:chatId', async (req, res) => {
  const { chatId } = req.params;
  const messages = await db.message.getAllByChatId(chatId);
  const sortedMessages = orderByLatestLast(messages);
  res.status(200).json({ messages: sortedMessages });
});

router.post('/new', async (req, res) => {
  const { userIds } = req.body; // in form of array
  const chatId = await db.chatroom.createChatroom(userIds);

  // TODO connect DB to chatroom
  res.json({ chatId });
});

router.post('/update/activity', async (req, res) => {
  const { chatId, userId } = req.body;
  console.log('update activity', chatId, userId);
  db.chatroom.updateActivty(userId, chatId);
});

module.exports = router;
