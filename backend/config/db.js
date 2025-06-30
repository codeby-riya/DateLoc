const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = 'mongodb+srv://admin:Riya1103@cluster0.fa015xn.mongodb.net/datelockdb?retryWrites=true&w=majority&appName=Cluster0';

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

