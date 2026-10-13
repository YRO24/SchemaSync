// server/migrations/v3_bad_update.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Student = require('../src/models/Student');

const runBadMigration = async () => {
  try {
    await connectDB();
    console.log('Running intentional failure migration...');

    // Attempting to insert a student missing the required 'name' and 'course' fields
    await Student.create({
      semester: 8
    });

    console.log('Wait, this should not have worked!');
    process.exit(0);
  } catch (error) {
    console.error(`Intentional migration failure successfully caught: ${error.message}`);
    // Exit code 1 is CRITICAL: This is what tells GitHub Actions to block the deployment
    process.exit(1);
  }
};

runBadMigration();
