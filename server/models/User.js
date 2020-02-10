const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        max: 255
    },
    password: {
        required: true,
        type: String,
        min: 6
    }
}, {timestamps: true});

// Named the collection as "demo_user" temporarily
module.exports = mongoose.model('demo_user', userSchema);
