import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import Profile from "../models/Profile.js";
import upload from "../middleware/upload.js";
import fs from "fs";

// @route   GET api/profiles
// @desc    Get profiles based on user's preference
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const currentUserProfile = await Profile.findOne({ user: req.user.id });
    if (!currentUserProfile || !currentUserProfile.interestedIn || currentUserProfile.interestedIn.length === 0) {
      // Return empty array if user has no preferences set yet
      return res.status(200).json([]);
    }

    const profiles = await Profile.find({
      user: { $ne: req.user.id },
      gender: { $in: currentUserProfile.interestedIn }
    }).populate("user", "username email");

    res.status(200).json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// @route   GET api/profiles/me
// @desc    Get logged-in user's profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "username email"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// @route   POST api/profiles
// @desc    Update a user profile
// @access  Private
router.post("/", auth, upload.array('images', 5), async (req, res) => {
  const { name, dob, gender, interestedIn, tagline, about, lookingFor, interests } = req.body;

  // --- 18+ VALIDATION FOR PROFILE UPDATES ---
  if (dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      return res.status(400).json({ message: "You must be at least 18 years old." });
    }
  }
  // --- END VALIDATION ---

  try {
    const oldProfile = await Profile.findOne({ user: req.user.id });
    const oldImagePaths = oldProfile ? oldProfile.images : [];

    const profileFields = { name, dob, gender, interestedIn, tagline, about, lookingFor, interests };

    // Parse interests if they are sent as a string
    if (interests && typeof interests === 'string') {
        profileFields.interests = interests.split(',');
    }

    if (req.files && req.files.length > 0) {
      profileFields.images = req.files.map(file => file.path);
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );

    if (req.files && req.files.length > 0) {
      oldImagePaths.forEach(filePath => {
        if (filePath) fs.unlink(filePath, (err) => {
          if (err) console.error(`Failed to delete old image: ${filePath}`, err);
        });
      });
    }

    return res.status(200).json(updatedProfile);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;