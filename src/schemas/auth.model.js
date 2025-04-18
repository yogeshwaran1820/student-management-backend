const mongoose = require("mongoose");

const Users = mongoose.Schema({
    rollNo: {
        type: String,
        required: false,
        unique: true
    },
    username : {
        type: String,
        required: [true, 'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    role: {
        type: String,
        enum: ['admin', 'student'],
        required: true
    }
})

module.exports = new mongoose.model('Users', Users)