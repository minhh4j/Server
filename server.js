require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const connectDb = require('./config/db');
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const productsRoutes = require('./routes/productsRoutes')
const cartRoutes = require('./routes/cartRoutes')
const OrderRoutes = require('./routes/orderRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const app = express();


app.use(express.json());
app.use(cookieParser());

// connect to db

connectDb();

// User
app.use('/api', userRoutes)
app.use('/api',productsRoutes)
app.use('/api/user',cartRoutes)
app.use('/api/user' , OrderRoutes)
app.use('/api/user', wishlistRoutes)

//Admin
app.use('/api/admin' , productsRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3006
app.listen(PORT , () => console.log(`🚀 Server is running on port ${PORT}`))