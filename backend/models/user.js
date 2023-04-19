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
    },
    bio: {
        type: String
    },
    postcount: {
        type: Number,
    },
    followercount: {
        type: Number,
    },
    followingcount: {
        type: Number,
    },
    posts: [{
        post: {
            type: String,
        },
        caption: {
            type: String,
        },
        like: {
            type: Number,

        },
        comments: [{
            comment: {
                type: String,
            },
        }],
        date: {
            type: Date,
            default: Date.now,
        }
    }],
});

const User = new mongoose.model('USER', userSchema);

module.exports = User;
