// routes/profiles.js
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import Profile from "../models/Profile.js";
import upload from "../middleware/upload.js";
import fs from "fs";

// @route   GET api/profiles
// @desc    Get all profiles (for swiping)
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({
      user: { $ne: req.user.id }, // exclude logged-in user's profile
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

// @route   GET api/profiles/:id
// @desc    Get profile by user ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
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
// @desc    Create or update a user profile
// @access  Private
// upload.array('images', 5) ka matlab hai ki 'images' field se max 5 files upload ho sakti hain
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  const { name, age, tagline, about, lookingFor, interests } = req.body;

  try {
    // --- 2. Find the existing profile to get old image paths ---
    const oldProfile = await Profile.findOne({ user: req.user.id });
    const oldImagePaths = oldProfile ? oldProfile.images : [];

    const profileFields = { name, age, tagline, about, lookingFor, interests };

    // If new files were uploaded, add their paths
    if (req.files && req.files.length > 0) {
      profileFields.images = req.files.map((file) => file.path);
    }

    // Update the profile in the database
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true } // upsert:true will create if it doesn't exist
    );

    // --- 3. Delete the old images from the filesystem ---
    // Only do this if new images were successfully uploaded
    if (req.files && req.files.length > 0) {
      oldImagePaths.forEach((filePath) => {
        fs.unlink(filePath, (err) => {
          if (err)
            console.error(`Failed to delete old image: ${filePath}`, err);
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
