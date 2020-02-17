const router = require('express').Router();
const db = require('../controllers');

router.get('/messages/all', async (req, res) => {
  const { userId } = res.locals;
  const chatIds = db.user.getChatsById(id);
  const messages = db.messages;
});

router.get('/messages/:chatId', async (req, res) => {
  const { chatId } = req.params;
  const messages = await db.message.getAllByChatId(chatId);
  console.log(messages);
  res.status(200).json(messages);
});

router.get('/verify/:chatId', async (req, res) => {
  const { chatId } = req.params;
  db.chatroom.getChatroomById(chatId);
});

router.post('/new', async (req, res) => {
  const { userIds } = req.body; // in form of array
  const chatId = await db.chatroom.createChatroom(userIds);
  res.json({ chatId });
});

module.exports = router;
