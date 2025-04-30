const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    word1: {
        type: String,
        required: [true, 'First word is required'],
        trim: true,
        minlength: [1, 'Word must not be empty'],
        maxlength: [100, 'Word is too long']
    },
    word2: {
        type: String,
        required: [true, 'Second word is required'],
        trim: true,
        minlength: [1, 'Word must not be empty'],
        maxlength: [100, 'Word is too long']
    },
    searchVolume1: {
        type: Number,
        required: [true, 'Search volume for first word is required'],
        min: [0, 'Search volume must be positive']
    },
    searchVolume2: {
        type: Number,
        required: [true, 'Search volume for second word is required'],
        min: [0, 'Search volume must be positive']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Compound index for better query performance
wordSchema.index({ isActive: 1, createdAt: -1 });

// Virtual for determining which word has higher search volume
wordSchema.virtual('higherSearchVolume').get(function() {
    return this.searchVolume1 > this.searchVolume2 ? 'word1' : 'word2';
});

// Pre-save middleware to ensure words are different
wordSchema.pre('save', function(next) {
    if (this.word1.toLowerCase() === this.word2.toLowerCase()) {
        next(new Error('Words must be different'));
    }
    next();
});

// Static method to get random word pair
wordSchema.statics.getRandomPair = async function() {
    const count = await this.countDocuments({ isActive: true });
    if (count === 0) return null;
    
    const random = Math.floor(Math.random() * count);
    return this.findOne({ isActive: true }).skip(random);
};

const Word = mongoose.model('Word', wordSchema);

module.exports = Word; 