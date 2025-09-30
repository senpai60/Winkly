// routes/settings.js
import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import Settings from '../models/Settings.js';

// @route   GET api/settings
// @desc    Get the current user's settings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Find settings document for the logged-in user
    const settings = await Settings.findOne({ user: req.user.id });
    if (!settings)
      return res.status(404).json({ message: "Settings not found" });

    // Return settings as JSON
    res.status(200).json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT api/settings
// @desc    Update the current user's settings
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    // 'updates' contains only the fields sent by the user in request body
    const updates = req.body;

    // findOneAndUpdate will:
    // - locate the settings document by user id
    // - apply only the fields provided in 'updates' using $set
    // - return the new updated document (new: true)
    // - enforce schema validators on the updated fields (runValidators: true)
    const settings = await Settings.findOneAndUpdate(
      { user: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!settings)
      return res.status(404).json({ message: "Settings not found" });

    res.status(200).json({ message: "Settings updated", settings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
