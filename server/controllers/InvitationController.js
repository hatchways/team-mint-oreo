const Error = require('../utils/Error');
const UserController = require('../controllers/UserController');
const Invitation = require('../models/Invitation');
const mailService = require('../services/mailService');

const createInvitation = async (fromUserEmail, toUserEmail, assignedId) => {
  try {
    const invitation = new Invitation({
      fromUser: fromUserEmail,
      toUser: toUserEmail,
      code: assignedId,
    });
    // Invitation is successfully created
    const savedInvitation = await invitation.save();

    return savedInvitation;
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      throw new Error(400, 'No duplicate invitation is allowed!');
    }

    throw new Error(500, 'Create Invitation', err);
  }
};

const invitationExists = async (fromUser, toUser) => {
  try {
    const invitation = await Invitation.findOne({ fromUser, toUser });
    return invitation !== null ? true : false;
  } catch (err) {
    throw new Error(500, 'Invitation Existence', err);
  }
};

const getInvitations = async email => {
  try {
    const incoming = await Invitation.find({ toUser: email });
    console.log('incoming: ', incoming);
    return incoming;
  } catch (err) {
    throw new Error(500, 'Get Invitation', err);
  }
};

const deleteInvitation = async invitationId => {
  try {
    const deletedInvitation = await Invitation.findOneAndDelete(invitationId);
    console.log(deletedInvitation, ' was deleted from db');
  } catch (err) {
    throw new Error(500, 'Delete Invitation', err);
  }
};

const updateToUser = async (code, toUser) => {
  try {
    const invitation = await Invitation.findOneAndUpdate({ code }, { toUser }, { new: true });
    console.log('Updated Invitation: ', invitation);
    return invitation;
  } catch (err) {
    throw new Error(500, 'Update To User', err);
  }
};

module.exports = {
  createInvitation,
  invitationExists,
  getInvitations,
  deleteInvitation,
  updateToUser,
};
