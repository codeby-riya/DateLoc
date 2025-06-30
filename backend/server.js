
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const startEmailScheduler = require('./scheduler/EmailScheduler');

const app = express();
connectDB(); 
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST'],
  credentials: true
}));
app.get('/', (req, res) => {
  res.send('API is working');
});
app.use('/api/auth', authRoutes);



app.use('/api/emails', emailRoutes);

startEmailScheduler();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

