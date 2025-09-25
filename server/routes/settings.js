// routes/settings.js
import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

// @route   GET api/settings
// @desc    Get the current user's settings
// @access  Private
router.get('/', auth, (req, res) => {
  // Controller logic to get settings
  res.send('User settings');
});

// @route   PUT api/settings
// @desc    Update the current user's settings
// @access  Private
router.put('/', auth, (req, res) => {
  // Controller logic to update settings
  res.send('Settings updated');
});

export default router;