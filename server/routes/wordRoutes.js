const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// GET all word pairs
router.get('/words', async (req, res) => {
    try {
        const words = await Word.find({ isActive: true });
        res.json(words);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET random word pair for game
router.get('/words/random', async (req, res) => {
    try {
        const count = await Word.countDocuments({ isActive: true });
        const random = Math.floor(Math.random() * count);
        const word = await Word.findOne({ isActive: true }).skip(random);
        res.json(word);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET specific word pair
router.get('/words/:id', async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        if (word && word.isActive) {
            res.json(word);
        } else {
            res.status(404).json({ message: 'Word pair not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new word pair
router.post('/words', async (req, res) => {
    const word = new Word({
        word1: req.body.word1,
        word2: req.body.word2,
        searchVolume1: req.body.searchVolume1,
        searchVolume2: req.body.searchVolume2
    });

    try {
        const newWord = await word.save();
        res.status(201).json(newWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT/UPDATE word pair
router.put('/words/:id', async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        if (!word || !word.isActive) {
            return res.status(404).json({ message: 'Word pair not found' });
        }

        if (req.body.word1) word.word1 = req.body.word1;
        if (req.body.word2) word.word2 = req.body.word2;
        if (req.body.searchVolume1) word.searchVolume1 = req.body.searchVolume1;
        if (req.body.searchVolume2) word.searchVolume2 = req.body.searchVolume2;

        const updatedWord = await word.save();
        res.json(updatedWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE word pair (soft delete)
router.delete('/words/:id', async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        if (!word || !word.isActive) {
            return res.status(404).json({ message: 'Word pair not found' });
        }

        word.isActive = false;
        await word.save();
        res.json({ message: 'Word pair deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 