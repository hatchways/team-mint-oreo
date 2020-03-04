const sgMail = require('@sendgrid/mail');

// Set api key for sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { HOST_NAME } = process.env;

const sendInvitationEmail = (fromUser, toUser, randomId, done) => {
  try {
    const msg = {
      to: toUser,
      from: fromUser,
      subject: 'New Invitation Notification',
      text: 'New Invitation from user ' + fromUser + ' has arrived!',
      html: `<p>Accept / Decline friend request by logging in
                <a href="${HOST_NAME}/login">here</a>
                or by registering
                <a href="${HOST_NAME}/register">here</a>
            </p>`,
    };

    sgMail.send(msg);
    return done(null, true);
  } catch (err) {
    console.error(err);
    return done(err);
  }
};

const sendResetMail = (userMail, resetCode, done) => {
  try {
    const msg = {
      to: userMail,
      from: 'y7ahfd@hotmail.com',
      subject: 'Reset Your Password',
      text: 'Reset your password using the link below',
      //html: `<p>Accept / Decline friend request in <a href='http://localhost:3000/invitation/' + ${randomId}>here</a></p>`,
      html: `<p>Please note that you must change your password within one hour after
                receiving this message</p>
             <a href="http://localhost:3000/reset/${resetCode}">reset password</a>`
      };

      sgMail.send(msg);
      return done(null, true);
  } catch(err) {
    console.error(err);
    return done(err);
  }
}

module.exports = {
  sendInvitationEmail,
  sendResetMail,
};
