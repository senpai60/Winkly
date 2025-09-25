// routes/matches.js
import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

// @route   GET api/matches
// @desc    Get all matches for the current user
// @access  Private
router.get('/', auth, (req, res) => {
  // Controller logic to get matches
  res.send('All matches');
});

// @route   GET api/matches/:id/messages
// @desc    Get messages for a specific match
// @access  Private
router.get('/:id/messages', auth, (req, res) => {
  // Controller logic to get messages
  res.send(`Messages for match ${req.params.id}`);
});

// @route   POST api/matches/:id/messages
// @desc    Send a message in a match
// @access  Private
router.post('/:id/messages', auth, (req, res) => {
  // Controller logic to send a message
  res.send(`Message sent in match ${req.params.id}`);
});

export default router;