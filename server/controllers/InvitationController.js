const Error = require('../utils/Error');

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
    throw new Error(500, 'Create Invitation', err);
  }
};

const getInvitations = async email => {
  try {
    const incoming = await Invitation.find({ toUser: email });
    console.log(incoming);
  } catch (err) {
    throw new Error(500, 'Get Invitation', err);
  }
};

const deleteInvitation = (fromUser, toUser) => {
  try {
    Invitation.findOneAndDelete({ fromUser, toUser });
  } catch (err) {
    throw new Error(500, 'Delete Invitation', err);
  }
};

module.exports = {
  createInvitation,
  getInvitations,
  deleteInvitation,
};
