const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    posts: [{
        post: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
        },
        like: {
            type: Number,
            required: true
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

const UserPost = new mongoose.model('UserPost', postSchema);

module.exports = UserPost;
