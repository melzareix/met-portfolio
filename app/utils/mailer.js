const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const emailTemplate = require('email-templates').EmailTemplate;
const path = require('path');

const options = {
    auth: {
        api_key: process.env.SEND_GRID
    }
};

const mailer = nodemailer.createTransport(sgTransport(options));

var forgotPasswordMail = function (email, host, resetToken, cb) {


    const emailVars = {
        reset_url: 'http://' + host + '/api/v1/auth/reset/' + resetToken,
        host_url: 'http://google.com', // TO BE CHANGED AT DEPLOYMENT
        title: 'MET Portfolio'
    };

    const templateDir = path.join(__dirname, '../email/templates', 'forgot-password');
    const forgotPasswordTemplate = new emailTemplate(templateDir);

    forgotPasswordTemplate.render(emailVars, function (err, result) {

        if (err) {
            return cb(err);
        }

        const emailContent = {
            to: [email],
            from: 'mohamedelzarei@gmail.com',
            subject: 'MET Portfolio Password Reset',
            html: result.html,
            text: result.text
        };
        mailer.sendMail(emailContent, cb);
    });
};


module.exports = {
    forgotPassword: forgotPasswordMail
};