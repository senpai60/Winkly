// routes/profiles.js
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import Profile from "../models/Profile.js";

// @route   GET api/profiles
// @desc    Get all profiles (for swiping)
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({
      user: { $ne: req.user.id } // exclude logged-in user's profile
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
router.post("/", auth, async (req, res) => {
  const { name, age, images, tagline, about, lookingFor, interests } = req.body;

  try {
    // Check if profile exists
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: { name, age, images, tagline, about, lookingFor, interests } },
        { new: true }
      );
      return res.status(200).json(profile);
    }

    // Create new profile
    const newProfile = new Profile({
      user: req.user.id,
      name,
      age,
      images,
      tagline,
      about,
      lookingFor,
      interests,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
