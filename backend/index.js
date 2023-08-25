const express = require('express');
const app = express();
const dotenv = require('dotenv')
const { connectDB } = require('./Middleware/db');
const authRoutes = require('./routes/authRoutes');
// Define your routes here
dotenv.config();

connectDB();

app.use('/api/auth', authRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
