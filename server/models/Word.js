const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    word1: {
        type: String,
        required: true,
        trim: true
    },
    word2: {
        type: String,
        required: true,
        trim: true
    },
    searchVolume1: {
        type: Number,
        required: true
    },
    searchVolume2: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Word', wordSchema); 