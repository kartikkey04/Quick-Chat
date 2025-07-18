const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true,
        select: false,
        minlength: 8
    },

    profilePic:{
        type: String,
        required: false
    }
}, {timestamp: true})

module.exports = mongoose.model('user', userSchema);

