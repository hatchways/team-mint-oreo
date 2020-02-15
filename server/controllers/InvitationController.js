const Error = require('../utils/Error');
const UserController = require('../controllers/UserController');
const Invitation = require('../models/Invitation');

const createInvitation = async (fromUser, toUserEmail) => {
  try {
    const toUser = await UserController.getByEmail(toUserEmail);
    const invitation = new Invitation({
      fromUser,
      toUser: toUser.id,
    });
    // Invitation is successfully created
    const savedInvitation = await invitation.save();

    // Add invitation to to_user
    UserController.addInvitationById(toUser.id, savedInvitation.id);

    return savedInvitation;
  } catch (err) {
    if (err.code === 11000) {
      throw new Error(400, 'No duplicate invitation is allowed!');
    }

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

const deleteInvitation = async invitationId => {
  try {
    const deletedInvitation = await Invitation.findOneAndDelete(invitationId);
    console.log(deletedInvitation, ' was deleted from db');
  } catch (err) {
    throw new Error(500, 'Delete Invitation', err);
  }
};

module.exports = {
  createInvitation,
  getInvitations,
  deleteInvitation,
};
