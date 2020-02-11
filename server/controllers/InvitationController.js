const Invitation = require('../models/Invitation');

const createInvitation = async (fromUser, toUser) => {
  const invitation = new Invitation({
    fromUser,
    toUser,
  });

  try {
    // Invitation is successfully created
    const savedInvitation = await invitation.save();
    console.log('New invitation is created');
  } catch (err) {
    // Failed to create an invitation
    console.error(err);
  }
};

const addPendingInvitation = async invitation => {
  /* 
        probably the method that adds pending invitation to 
        the user that received one
  */
};

module.exports = {
  createInvitation,
};
