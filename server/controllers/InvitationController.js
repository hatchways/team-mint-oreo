const Invitation = require('../models/Invitation');
const User = require('../models/User');

const createInvitation = async (fromUser, toUser, done) => {
  const invitation = new Invitation({
    from_user: fronUser,
    to_user: toUser,
  });

  try {
    // Invitation is successfully created
    const savedInvitation = await invitation.save();
    console.log('New invitation is created');
    return done(null, savedInvitation);
  } catch (err) {
    // Failed to create an invitation
    console.error(err);
    return done(err);
  }
};

const addPendingInvitation = async (invitation, done) => {
  /* 
        probably the method that adds pending invitation to 
        the user that received one
  */
};

module.exports = {
  createInvitation,
};
