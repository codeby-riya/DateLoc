const Email = require('../models/emailModel');

const scheduleEmail = async (req, res) => {
  try {
    const { email, subject, message, datetime, location, sender } = req.body;

    const existing = await Email.findOne({ sender });

    const newEmail = new Email({
      email,
      subject,
      message,
      datetime,
      location,
      sender,
      senderRefreshToken: existing?.senderRefreshToken || null,
      status: 'Pending'
    });

    await newEmail.save();

    res.status(201).json({ message: 'Email scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling email:', error);
    res.status(500).json({ message: 'Failed to schedule email' });
  }
};

const getAllEmails = async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ message: 'Missing user email' });
    }

    const emails = await Email.find({ sender: userEmail }).sort({ datetime: 1 });
    res.status(200).json(emails);
  } catch (err) {
    console.error('Error fetching emails:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { scheduleEmail, getAllEmails };
