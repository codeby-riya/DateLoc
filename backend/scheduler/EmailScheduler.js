const cron = require('node-cron');
const Email = require('../models/emailModel');
const { google } = require('googleapis');
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://datelock.vercel.app';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const sendEmail = async (email) => {
  try {
    oAuth2Client.setCredentials({ refresh_token: email.senderRefreshToken });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const rawMessage = Buffer.from(
      `To: ${email.email}\r\n` +
      `Subject: ${email.subject}\r\n\r\n` +
      `${email.message}`
    ).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage,
      },
    });

    await Email.findByIdAndUpdate(email._id, { status: 'Sent' });
    console.log(`✅ Email sent to ${email.email}`);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};

const startEmailScheduler = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const pendingEmails = await Email.find({
      status: 'Pending',
      datetime: { $lte: now },
    });

    for (const email of pendingEmails) {
      await sendEmail(email);
    }
  });

  console.log('⏰ Scheduler running every 1 min...');
};

module.exports = startEmailScheduler;
