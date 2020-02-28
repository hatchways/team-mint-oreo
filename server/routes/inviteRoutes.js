const router = require('express').Router();
const db = require('../controllers');

router.post('/', async (req, res) => {
  const { code, toUserId } = req.body;
  console.log('req body: ', req.body);
  try {
    // Find toUser and fromUser asynchronously
    const data = await Promise.all([
      db.user.getAssociatedUserByCode(code),
      db.user.getById(toUserId),
    ]);
    const [associatedUser, toUser] = data;
    const newInvitation = await db.invitation.createInvitation(
      associatedUser.email,
      toUser.email,
      code
    );
    console.log('new invitation created: ', newInvitation);

    return res.status(200).json({
      success: true,
      data: newInvitation,
    });
  } catch (err) {
    return res.status(err.status).json({
      error: err.message,
    });
  }
});

module.exports = router;
