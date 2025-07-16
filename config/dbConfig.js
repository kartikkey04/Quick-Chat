const mongoose = require('mongoose');
require('dotenv').config({path: './config.env'});

mongoose.connect(process.env.CONN_STRING);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('DB connection successfull!');
})

db.on('err', () => {
    console.log('DB connection failed!');
})

module.exports = db;