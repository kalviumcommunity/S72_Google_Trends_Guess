const { AppError } = require('../utils/errorHandler');

const validateWordPair = (req, res, next) => {
    const { word1, word2, searchVolume1, searchVolume2 } = req.body;

    // Check if required fields are present
    if (!word1 || !word2 || searchVolume1 === undefined || searchVolume2 === undefined) {
        return next(new AppError('Missing required fields', 400));
    }

    // Validate data types
    if (typeof word1 !== 'string' || typeof word2 !== 'string') {
        return next(new AppError('Words must be strings', 400));
    }

    if (typeof searchVolume1 !== 'number' || typeof searchVolume2 !== 'number') {
        return next(new AppError('Search volumes must be numbers', 400));
    }

    // Validate search volumes are positive
    if (searchVolume1 < 0 || searchVolume2 < 0) {
        return next(new AppError('Search volumes must be positive numbers', 400));
    }

    // Trim words and update request body
    req.body.word1 = word1.trim();
    req.body.word2 = word2.trim();

    // Validate words are not empty after trimming
    if (!req.body.word1 || !req.body.word2) {
        return next(new AppError('Words cannot be empty', 400));
    }

    next();
};

const validateMongoId = (req, res, next) => {
    const { id } = req.params;
    const mongoIdPattern = /^[0-9a-fA-F]{24}$/;
    
    if (!mongoIdPattern.test(id)) {
        return next(new AppError('Invalid ID format', 400));
    }
    
    next();
};

module.exports = {
    validateWordPair,
    validateMongoId
}; 