const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        require: true
    },
    avatarImg: {
        type: String,
        default: ""
    },
    isAvatarSet: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema);
