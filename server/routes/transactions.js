// routes/transactions.js
import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

// @route   GET api/transactions
// @desc    Get the current user's transaction history
// @access  Private
router.get('/', auth, (req, res) => {
  // Controller logic to get transactions
  res.send('Transaction history');
});

export default router;