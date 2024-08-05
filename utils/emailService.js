const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nkpnilesh13@gmail.com',
        pass: 'pkfp cors dmax cnzt'
    }
});

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//      user: 'nkpnilesh13@gmail.com',
//     pass: 'pkfp cors dmax cnzt'
//     },
//    });

const sendEmail = (to, subject, text, html) => {
    console.log(to, subject, text);
    const mailOptions = {
        from: 'nkpnilesh@gmail.com',
        to,
        subject,
        // text
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;
