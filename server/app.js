// app.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import allRoutes from './routes/index.js';

const app = express();

const viteURI ='http://localhost:3000'
const ngrokURI ='https://772518edf9e8.ngrok-free.app'

const corsOptions = {
  origin: viteURI, // Allow your Vite frontend
  optionsSuccessStatus: 200 
};

// --- Core Security & Parser Middleware ---
app.use(helmet({ crossOriginResourcePolicy: false })); // Allow cross-origin images
app.use(cors(corsOptions));
app.use(express.json());


// --- ES Module workarounds for __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Serve Static Files ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Database connection failed:', err));

// --- API Routes ---
app.use('/api', allRoutes);

// --- Server Health Check Route ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'NFT Dating App API is up and running!' });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});