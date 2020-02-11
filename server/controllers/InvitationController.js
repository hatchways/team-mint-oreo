const Invitation = require('../models/Invitation');

const createInvitation = async (fromUser, toUser) => {
  const invitation = new Invitation({
    fromUser,
    toUser,
  });

  try {
    // Invitation is successfully created
    const savedInvitation = await invitation.save();
    console.log('New invitation is created', savedInvitation);
  } catch (err) {
    // Failed to create an invitation
    console.error(err);
  }
};

const getInvitations = async email => {
  try {
    const incoming = await Invitation.find({ toUser: { $eq: { email } } });
    console.log(incoming);
  } catch (err) {
    console.error('error getting invites', err);
  }
};

const deleteInvitation = (fromUser, toUser) => {
  try {
    Invitation.findOneAndDelete({ fromUser, toUser });
  } catch (err) {
    console.error('del. inv fail', err);
  }
};

module.exports = {
  createInvitation,
  getInvitations,
  deleteInvitation,
};
