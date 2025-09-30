// routes/profiles.js
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import Profile from "../models/Profile.js";
import upload from "../middleware/upload.js";

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
    let profileFields = { name, age, tagline, about, lookingFor, interests };

    // Agar files upload hui hain, to unke path ko add karo
    if (req.files) {
      // req.files ek array hoga, hum har file ka path nikalenge
      const imagePaths = req.files.map((file) => file.path);
      profileFields.images = imagePaths;
    }

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Profile ko update karo
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    }

    // Naya profile create karne ka logic ab register route mein hai,
    // lekin isko yahan bhi rakhna ek fallback ke liye accha hai.
    const newProfile = new Profile({
      ...profileFields,
      user: req.user.id,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
