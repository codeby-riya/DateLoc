const express = require('express');
const router = express.Router();
const { scheduleEmail, getAllEmails } = require('../controllers/emailController');

router.post('/schedule', scheduleEmail);
router.get('/all', getAllEmails);


module.exports = router;
