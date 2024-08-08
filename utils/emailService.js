const { google } = require('googleapis')
const nodemailer = require('nodemailer');

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URIS)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

async function sendMail(email, subject, html, cc, bcc) {
    try {
        const ACCESS_TOKEN = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "nkpnilesh13@gmail.com",
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN,
            },
        })
        const mailOptions = {
            from: `"Nilesh" <nkpnilesh13@gmail.com>`,
            to: email,
            subject: subject,
            html: html,
        }

        if(cc != undefined){
            mailOptions["cc"] = cc
        }

        if(bcc != undefined){
            mailOptions["bcc"] = bcc
        }

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (err) {
        return {
            status: false,
            error: {
                errorMsg: err.message
            },
        }
    }
}

module.exports = sendMail