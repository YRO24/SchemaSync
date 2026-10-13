// server/index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const studentRoutes = require('./src/routes/studentRoutes');

const app = express();

// 1. Connect to Database
connectDB();

// 2. Parse incoming JSON requests
app.use(express.json());

// 3. Application health endpoint (Required for Partner 2's Docker checks)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// 4. Mount the student CRUD routes
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});