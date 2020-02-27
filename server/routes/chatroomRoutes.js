const router = require('express').Router();
const db = require('../controllers');
const format = require('../services/formatDataService');
const { uploadSaltedPic } = require('../aws/aws-utils');

router.get('/messages/:chatId', async (req, res) => {
  const { chatId } = req.params;
  const messages = await db.message.getAllByChatId(chatId);
  const sortedMessages = format.messagesData(messages);
  res.status(200).json({ messages: sortedMessages });
});

router.get('/data/:chatId', (req, res) => {
  const { chatId } = req.params;
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
/**
 * Uploads a picture, no fuss.
 *
 * Uploads a picture to S3 bucket, sends the uploaded url as result on success
 * @param {Object} req       The request object.
 * @param {Object} req.body  The body of the request object must
 *
 * @return undefined
 */
router.post('/uploadpic', async (req, res) => {
  try {
    const { userId } = res.locals;
    const pic = req.body;
    const awsResult = await uploadSaltedPic(pic);
    const { Location: location } = awsResult;
    console.log(`${userId} uploading Picture`);

    res.status(201).json({
      success: true,
      pic: location,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
