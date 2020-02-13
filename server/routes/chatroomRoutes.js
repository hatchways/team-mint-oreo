const router = require('express').Router();
const db = require('../controllers');

router.get('/messages/all/user', async (req, res) => {
  const { id } = res.locals;
  const chatIds = db.user.getChatsById(id);
  const messages = db.messages;
});

router.get('/messages/all/:chatId', async (req, res) => {
  const { chatId } = req.params;
  // when request coming from clicking contact, contain idpair
  // request messages from db
  // if chat doesn't exist (dinstinction between doesnt exist and no messages)
  // create a db and add users via id pair,
});

router.get('/create', (req, res) => {});

router.post('/new', async (req, res) => {
  const { userIds } = req.body; // in form of array
  const chatId = await db.chatroom.createChatroom(userIds);
  res.json({ chatId });
});

module.exports = router;
