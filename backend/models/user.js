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
        Default: "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",
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
