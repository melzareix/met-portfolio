const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const options = {
    auth: {
        api_key: process.env.SEND_GRID
    }
};

const mailer = nodemailer.createTransport(sgTransport(options));

var forgotPasswordMail = function (email, host, resetToken, cb) {
    const emailContent = {
        to: [email],
        from: 'mohamedelzarei@gmail.com',
        subject: 'MET Portfolio Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + host + '/api/v1/auth/reset/' + resetToken + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    mailer.sendMail(emailContent, cb);
};


module.exports = {
    forgotPassword: forgotPasswordMail
};