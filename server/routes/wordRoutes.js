const express = require('express');
const router = express.Router();
const Word = require('../models/Word');
const { AppError, handleError } = require('../utils/errorHandler');
const { validateWordPair, validateMongoId } = require('../middleware/validation');

// Wrap async route handlers
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// GET all word pairs
router.get('/words', asyncHandler(async (req, res) => {
    const words = await Word.find({ isActive: true });
    res.json({
        status: 'success',
        results: words.length,
        data: words
    });
}));

// GET random word pair for game
router.get('/words/random', asyncHandler(async (req, res) => {
    // Use aggregation with $sample for better performance
    const [word] = await Word.aggregate([
        { $match: { isActive: true } },
        { $sample: { size: 1 } }
    ]);

    if (!word) {
        throw new AppError('No word pairs available', 404);
    }

    res.json({
        status: 'success',
        data: word
    });
}));

// GET specific word pair
router.get('/words/:id', validateMongoId, asyncHandler(async (req, res) => {
    const word = await Word.findOne({ _id: req.params.id, isActive: true });
    
    if (!word) {
        throw new AppError('Word pair not found', 404);
    }

    res.json({
        status: 'success',
        data: word
    });
}));

// POST new word pair
router.post('/words', validateWordPair, asyncHandler(async (req, res) => {
    const word = new Word(req.body);
    const newWord = await word.save();

    res.status(201).json({
        status: 'success',
        data: newWord
    });
}));

// PUT/UPDATE word pair
router.put('/words/:id', validateMongoId, validateWordPair, asyncHandler(async (req, res) => {
    const word = await Word.findOneAndUpdate(
        { _id: req.params.id, isActive: true },
        req.body,
        { new: true, runValidators: true }
    );

    if (!word) {
        throw new AppError('Word pair not found', 404);
    }

    res.json({
        status: 'success',
        data: word
    });
}));

// DELETE word pair (soft delete)
router.delete('/words/:id', validateMongoId, asyncHandler(async (req, res) => {
    const word = await Word.findOneAndUpdate(
        { _id: req.params.id, isActive: true },
        { isActive: false },
        { new: true }
    );

    if (!word) {
        throw new AppError('Word pair not found', 404);
    }

    res.json({
        status: 'success',
        message: 'Word pair deleted'
    });
}));

// Error handling middleware
router.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = router; 