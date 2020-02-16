const router = require('express').Router();
const db = require('../controllers');

router.get('/messages/all', async (req, res) => {
  const { userId } = res.locals;
  const chatIds = db.user.getChatsById(id);
  const messages = db.messages;
});

router.get('/messages/:chatId', async (req, res) => {
  const { chatId } = req.params;
});

router.get('/verify/:chatId', async (req, res) => {
  const { chatId } = req.params;
  db.chatroom.getChatroomById(chatId);
});

router.post('/new', async (req, res) => {
  const { userIds } = req.body; // in form of array
  const chatId = await db.chatroom.createChatroom(userIds);
  // TODO connect DB to chatroom
  res.json({ chatId });
});

module.exports = router;
