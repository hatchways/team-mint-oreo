const Error = require('../utils/Error');
const UserController = require('../controllers/UserController');
const Invitation = require('../models/Invitation');
const mailService = require('../services/mailService');

const createInvitation = async (fromUserEmail, toUserEmail) => {
  try {
    // Check for friendship between the sender and receiver
    // If they are, returns error
    const friendExists = await UserController.checkFriendship(fromUserEmail, toUserEmail);
    if(friendExists) {
        throw new Error(fromUserEmail + ' and ' + toUserEmail + ' are already friends');
    }

    // Else condition
    await UserController.checkFriendship(fromUserEmail, toUserEmail);

    const invitation = new Invitation({
      fromUser: fromUserEmail,
      toUser: toUserEmail,
    });
    // Invitation is successfully created
    const savedInvitation = await invitation.save();

    // Add invitation to to_user
    UserController.addInvitationByEmail(toUserEmail, savedInvitation.id);

    // Sends notification email to the recipient
    console.log(toUserEmail);
    mailService.sendInvitationEmail(fromUserEmail, toUserEmail, (err, isSent) => {
        if(err) throw err;
        if(isSent) console.log('Email successfully sent');
    });

    return savedInvitation;
  } catch (err) {
    console.error(err);
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
