const router = require('express').Router();
const db = require('../controllers');

router.get('/messages/all', async (req, res) => {
  const { id } = res.locals;
  const chatIds = db.user.getChatsById(id);
  const messages = db.messages;
});

router.get('/messages/:chatId', async (req, res) => {
  const { chatId } = req.params;
});

module.exports = router;
