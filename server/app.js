// app.js

import dotenv from 'dotenv';
dotenv.config(); // loads .env at the very beginning

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


import allRoutes from './routes/index.js';
// import passportConfig from './'; // Import passport configuration



// Initialize Express App
const app = express();

// --- Core Security & Parser Middleware ---
app.use(helmet()); // Sets various security-related HTTP headers
app.use(cors());
app.use(express.json());

// --- Passport Middleware Initialization ---
// app.use(passport.initialize());
// passportConfig(passport); // Pass the passport object to our config function

// --- Rate Limiting ---
// Apply a rate limiter to authentication routes to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

// We'll apply this specifically to auth routes within your main router (index.js)
// or you can apply it here if you prefer: app.use('/api/auth', authLimiter);


// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI; // Get URI from .env

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Database connection failed:', err));

// --- API Routes ---
// Tip: You can pass the limiter to your main router if it handles all routes
app.use('/api', allRoutes); // Pass limiter to the router setup

// --- Server Health Check Route ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'NFT Dating App API is up and running!' });
});

// --- Start Server ---
const PORT = process.env.PORT; // Get PORT from .env

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});