const router = require('express').Router();
const db = require('../controllers');

router.post('/', async (req, res) => {
  const { code, toUser } = req.body;
  try {
    const associatedUser = await db.user.getAssociatedUserByCode(code);
    console.log('associatedUser: ', associatedUser);
    const newInvitation = await db.invitation.createInvitation(associatedUser.email, toUser, code);
    console.log('new invitation created: ', newInvitation);
  } catch(err) {
    return res.status(err.status).json({
      error: err.message
    });
  }
});

module.exports = router;
