// server/migrations/v2_add_email.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Student = require('../src/models/Student');
const Migration = require('../src/models/Migration');

const runMigration = async () => {
  try {
    await connectDB();
    const migrationName = 'v2_add_email';

    // 1. Check if migration already ran
    const exists = await Migration.findOne({ name: migrationName });
    if (exists) {
      console.log(`Migration ${migrationName} already applied. Skipping.`);
      process.exit(0);
    }

    // 2. Backfill the email field for existing V1 documents
    const result = await Student.updateMany(
      { email: { $exists: false } },
      { $set: { email: "pending@update.com" } }
    );

    // 3. Log the successful migration in the tracking collection
    await Migration.create({ name: migrationName });
    console.log(`Migration successful: Updated ${result.modifiedCount} records.`);

    process.exit(0); // Exit code 0 means success (Green check in CI pipeline)
  } catch (error) {
    console.error(`Migration failed: ${error.message}`);
    process.exit(1); // Exit code 1 means failure (Halts the CI pipeline)
  }
};

runMigration();
