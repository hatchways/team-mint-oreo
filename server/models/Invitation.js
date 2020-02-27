const mongoose = require('mongoose');
const { Schema } = mongoose;

const invitationModel = new Schema(
  {
    fromUser: {
      type: String,
      required: true,
    },
    toUser: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

invitationModel.index({ fromUser: 1, toUser: 1 }, { unique: true });

const Invitation = mongoose.model('invitation', invitationModel);

module.exports = Invitation;
