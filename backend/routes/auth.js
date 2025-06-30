const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const Email = require('../models/emailModel');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Update this to the deployed frontend URI
const REDIRECT_URI = 'https://datelock.vercel.app';

router.post('/google', async (req, res) => {
  const { code } = req.body;

  try {
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const { access_token, refresh_token, id_token } = tokenRes.data;

    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const email = userInfo.data.email;

    // Save the refresh token for this user's email
    await Email.updateMany(
      { sender: email },
      { $set: { senderRefreshToken: refresh_token } }
    );

    return res.json({ email });
  } catch (error) {
    console.error('Google OAuth error:', error.response?.data || error.message);
    return res.status(500).json({ message: 'OAuth login failed' });
  }
});

module.exports = router;
