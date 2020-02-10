const mongoose = require('mongoose');

const invitationModel = new mongoose.Schema(
  {
    from_user: {
      type: String,
      required: true,
    },
    to_user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model('invitation', invitationModel);

module.exports = Invitation;
