const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        ref: 'USER',
    },
    children: [{
        child: {
            type: String,
        }
    }],
    parents: [{
        parent: {
            type: String,
        }
    }],
});

const Followers = new mongoose.model('FOLLOWERS', followerSchema);
module.exports = Followers;
