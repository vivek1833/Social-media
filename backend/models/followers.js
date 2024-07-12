const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    followers: [{
        follower: {
            type: String,
        }
    }],
    following: [{
        follow: {
            type: String,
        }
    }]
});

const Followers = new mongoose.model('POST', followerSchema);
module.exports = Followers;
