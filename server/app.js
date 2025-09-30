// app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import allRoutes from './routes/index.js';

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  'https://winklyy.netlify.app', // Netlify frontend
  'http://localhost:3000'        // local dev
];

const corsOptions = {
  origin: function(origin, callback) {
    console.log('Incoming request from origin:', origin); // debug
    if (!origin) return callback(null, true); // allow Postman, curl, server-side
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: This origin is not allowed.'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200
};


// --- Core Security & Parser Middleware ---
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ES Module __dirname workaround ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Serve Static Files ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Successfully connected to MongoDB.'))
  .catch(err => console.error('❌ Database connection failed:', err));

// --- API Routes ---
app.use('/api', allRoutes);

// --- Server Health Check ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'NFT Dating App API is running!' });
});

// --- Global Error Handler (optional but good for CORS and others) ---
app.use((err, req, res, next) => {
  console.error('Global Error:', err.message);
  res.status(500).json({ error: err.message });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server live on http://localhost:${PORT}`));
