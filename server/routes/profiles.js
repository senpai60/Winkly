// routes/profiles.js
import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js'; // Assuming you have an auth middleware

// @route   GET api/profiles
// @desc    Get all profiles for swiping
// @access  Private
router.get('/', auth, (req, res) => {
  // Controller logic to get profiles
  res.send('All profiles');
});

// @route   GET api/profiles/:id
// @desc    Get profile by user ID
// @access  Private
router.get('/:id', auth, (req, res) => {
  // Controller logic to get a single profile
  res.send(`Profile of user ${req.params.id}`);
});

// @route   POST api/profiles
// @desc    Create or update a user profile
// @access  Private
router.post('/', auth, (req, res) => {
  // Controller logic to create/update a profile
  res.send('Profile created/updated');
});

export default router;