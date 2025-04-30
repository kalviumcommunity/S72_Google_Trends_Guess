const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection state
let isConnected = false;

// Connect to MongoDB
const initializeDB = async () => {
    try {
        isConnected = await connectDB();
        if (!isConnected) {
            console.error('Failed to connect to MongoDB. Server will continue but database features will not work.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
        isConnected = false;
    }
};

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        databaseStatus: isConnected ? 'connected' : 'disconnected'
    });
});

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Google Trends Guess API',
        databaseStatus: isConnected ? 'Connected' : 'Disconnected',
        healthCheck: '/health'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Initialize database and start server
const startServer = async () => {
    try {
        await initializeDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Database status: ${isConnected ? 'Connected' : 'Not Connected'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 