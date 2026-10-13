const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: Number, required: true },
  email: { type: String, required: false } // Version 2 Addition
});

module.exports = mongoose.model('Student', studentSchema);