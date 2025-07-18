const express = require('express');
const app = express();
const authRouter = require('./controllers/authController');
const userRouter = require('./controllers/userController');
require('dotenv').config({path: './config.env'});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

module.exports = app;