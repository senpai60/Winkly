// routes/swipes.js
import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

// @route   POST api/swipes
// @desc    Record a swipe action
// @access  Private
router.post('/', auth, (req, res) => {
  // Controller logic for swiping
  res.send('Swipe recorded');
});

export default router;