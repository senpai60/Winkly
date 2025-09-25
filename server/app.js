import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import allRoutes from './routes/index.js'; // Main router import

// Initialize Express App
const app = express();

// --- Core Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(express.json()); // Enable the express app to parse JSON formatted request bodies

// --- Database Connection ---
// It's recommended to use environment variables for your connection string in production
const MONGO_URI = process.env.MONGO_URI || 'YOUR_MONGODB_CONNECTION_STRING';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Database connection failed:', err));

// --- API Routes ---
// All API routes are prefixed with /api and handled by the main router
app.use('/api', allRoutes);

// --- Server Health Check Route ---
// A simple root endpoint to confirm the server is running
app.get('/', (req, res) => {
  res.status(200).json({ message: 'NFT Dating App API is up and running!' });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});

