const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    profilephoto: {
        type: String,
        Default: "https://plus.unsplash.com/premium_photo-1689606093808-3cb4393248d2?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    bio: {
        type: String
    },
    postcount: {
        type: Number,
        Default: 0,
    },
    followercount: {
        type: Number,
        Default: 0,
    },
    followingcount: {
        type: Number,
        Default: 0,
    },

});

const User = new mongoose.model('USER', userSchema);
module.exports = User;
