const mongoose = require('mongoose');
const { Schema } = mongoose;

const invitationModel = new Schema(
  {
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
