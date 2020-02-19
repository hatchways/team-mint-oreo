const sgMail = require('@sendgrid/mail');

// Set api key for sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendInvitationEmail = (fromUser, toUser, randomId, done) => {
    try {


        const msg = {
            to: toUser,
            from: fromUser,
            subject: 'New Invitation Notification',
            text: 'New Invitation from user ' + fromUser + ' has arrived!',
            html: `<p>Accept / Decline friend request in
                    <a href='http://localhost:3000/invitation/' + ${randomId}>here</a>
                   </p>`
        };

        sgMail.send(msg);
        return done(null, true);
    } catch(err) {
        console.error(err);
        return done(err);
    }
}

module.exports = {
    sendInvitationEmail
};
