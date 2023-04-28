const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
    },
    profilephoto: {
        type: String,
    },
    post: {
        type: String,
    },
    caption: {
        type: String,
    },
    likes: [{
        user: {
            type: String,
        }
    }],
    likecount: {
        type: Number,
        default: 0,
    },
    comments: [{
        comment: {
            type: String,
        },
        user: {
            type: String,
        }
    }],
    commentcount: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Post = new mongoose.model('POST', postSchema);

module.exports = Post;
