import express from 'express';

// Individual route imports
import userRoutes from './users.js';
import profileRoutes from './profiles.js';
import swipeRoutes from './swipes.js';
import matchRoutes from './matches.js';
import nftDateRoutes from './nftDates.js';
import ratingRoutes from './ratings.js';
import transactionRoutes from './transactions.js';
import settingsRoutes from './settings.js';

// Initialize the main router
const router = express.Router();

// --- Mount all API routes ---
// This section maps the base URL for each feature to its dedicated route file.
router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);
router.use('/swipes', swipeRoutes);
router.use('/matches', matchRoutes);
router.use('/nft-dates', nftDateRoutes);
router.use('/ratings', ratingRoutes);
router.use('/transactions', transactionRoutes);
router.use('/settings', settingsRoutes);

// Export the main router to be used in app.js
export default router;

