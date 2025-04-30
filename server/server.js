const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const wordRoutes = require('./routes/wordRoutes');
const { handleError } = require('./utils/errorHandler');

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

// Add request logging middleware for debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

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

// Routes
app.use('/api', wordRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        databaseStatus: isConnected ? 'connected' : 'disconnected',
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage()
    });
});

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Google Trends Guess API',
        databaseStatus: isConnected ? 'Connected' : 'Disconnected',
        healthCheck: '/health',
        apiDocs: '/api/docs'
    });
});

// Handle 404 routes
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Cannot ${req.method} ${req.path}`
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method
    });
    handleError(err, res);
});

// Initialize database and start server
const startServer = async () => {
    try {
        await initializeDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Database status: ${isConnected ? 'Connected' : 'Not Connected'}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

startServer(); 