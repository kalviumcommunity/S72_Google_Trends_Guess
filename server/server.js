const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection state
let isConnected = false;

// Connect to MongoDB
const initializeDB = async () => {
    isConnected = await connectDB();
};
initializeDB();

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Google Trends Guess API',
        databaseStatus: isConnected ? 'Connected' : 'Disconnected'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 