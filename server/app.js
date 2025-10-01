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
const vercelDomain = 'winkly-d0g143mky-vivek-satloniyas-projects.vercel.app';
const allowedOrigins = [
  'https://winklyy.netlify.app', // Production Frontend
  'http://localhost:3000',        // Local Dev
  `https://${vercelDomain}`,       // Vercel API Domain itself
  // If your Vercel deployment URL changes (e.g., after redeployment), 
  // you may need to add the new URL here, or use a regex/wildcard if all subdomains are needed.
];

// Standard CORS setup using the array of allowed origins
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}));

// ✅ FIX FOR VERCEl/SERVERLESS: Explicitly handle preflight OPTIONS requests for all routes.
// This forces the server to respond with the correct headers for the preflight request.
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}));


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

// Removed unnecessary useNewUrlParser and useUnifiedTopology options for modern Mongoose.
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB.'))
  .catch(err => console.error('❌ Database connection failed:', err));

// --- API Routes ---
app.use('/api', allRoutes);

// --- Server Health Check ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'NFT Dating App API is running!' });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error('Global Error:', err.message);
  // FIX: Removed the TypeScript type assertion '(err as any)' for plain JavaScript/Node.
  res.status(err.status || 500).json({ error: err.message || 'An unknown error occurred' });
});


// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server live on port ${PORT}`));
