const express = require('express');
const axios = require('axios');
const qs = require('qs'); // Required for sending URL-encoded data
require('dotenv').config();

const router = express.Router();
const Email = require('../models/emailModel');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://datelock.vercel.app'; // your deployed frontend

router.post('/google', async (req, res) => {
  const { code } = req.body;

  try {
    // Google expects form-urlencoded, not JSON
    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token, refresh_token } = tokenRes.data;

    // Get user email
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const email = userInfo.data.email;

    // Save refresh token for user
    await Email.updateMany(
      { sender: email },
      { $set: { senderRefreshToken: refresh_token } }
    );

    return res.json({ email });
  } catch (error) {
    console.error('🔴 Google OAuth error:', error.response?.data || error.message);
    return res.status(500).json({ message: 'OAuth login failed' });
  }
});

module.exports = router;
