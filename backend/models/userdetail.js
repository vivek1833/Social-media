const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    profilephoto: {
        type: String,
    },
    bio: {
        type: String
    },
    posts: {
        type: Number,
        required: true
    },
    followers: {
        type: Number,
        required: true
    },
    following: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const UserData = new mongoose.model('UserData', userSchema);

module.exports = UserData;
