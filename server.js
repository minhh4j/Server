require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const connectDb = require('./config/db');
const express = require('express');

const app = express();


app.use(express.json());
app.use(cookieParser());

// connect to db

connectDb();


app.use('/api', userRoutes);

const PORT = process.env.PORT || 3006
app.listen(PORT , () => console.log(`🚀 Server is running on port ${PORT}`))