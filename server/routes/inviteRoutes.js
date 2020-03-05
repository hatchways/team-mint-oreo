const router = require('express').Router();
const db = require('../controllers');
const Error = require('../utils/Error');

router.post('/', async (req, res) => {
  const { code, toUserId } = req.body;
  try {
    // throw new Error(they are already friends)
    // Find toUser and fromUser asynchronously
    const data = await Promise.all([
      db.user.getAssociatedUserByCode(code),
      db.user.getById(toUserId),
    ]);
    const [associatedUser, toUser] = data;

    // Check if two users are already friends
    const alreadyFriends = await db.user.checkFriendship(associatedUser.email, toUser.email);
    if (alreadyFriends) {
      throw new Error(400, `You are already friend with ${associatedUser.displayName}`);
    }

    const newInvitation = await db.invitation.createInvitation(
      associatedUser.email,
      toUser.email,
      code
    );
    console.log('new invitation created: ', newInvitation);

    return res.status(200).json({
      success: true,
      status: 200,
      data: newInvitation,
    });
  } catch (err) {
    console.log('The error is: ', err);
    return res.status(err.status).json({
      status: 400,
      error: err.message,
    });
  }
});

module.exports = router;
