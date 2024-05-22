const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
require('./tasks/cleanExpiredTokens');

const app = express();
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);

module.exports = app;