// server/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Falls back to localhost if the Docker environment variable isn't set yet
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/schemasync');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;