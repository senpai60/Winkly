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
    if (
      !currentUserProfile ||
      !currentUserProfile.interestedIn ||
      currentUserProfile.interestedIn.length === 0
    ) {
      // Return empty array if user has no preferences set yet
      return res.status(200).json([]);
    }

    const profiles = await Profile.find({
      user: { $ne: req.user.id },
      gender: { $in: currentUserProfile.interestedIn },
    }).populate("user", "username email");
    console.log(profiles);

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
      "username email",
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
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      dob,
      gender,
      interestedIn,
      tagline,
      about,
      lookingFor,
      interests,
    } = req.body;
    const profileFields = { name, dob, gender, tagline, about, lookingFor };

    if (interests) {
      // FIX: Check if 'interests' is already an array (which happens with multiple selections)
      // If it's an array, use it directly. If it's a string, then split it.
      profileFields.interests = Array.isArray(interests)
        ? interests
        : interests.split(",");
    }

    if (req.files && req.files.length > 0) {
      profileFields.images = req.files.map((file) => file.path); // Cloudinary URL
    }

    if (interestedIn) profileFields.interestedIn = interestedIn.split(",");

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true },
    );

    return res.status(200).json(updatedProfile);
  } catch (err) {
    console.error("Profile update error:", err);
    return res
      .status(500)
      .json({ message: "Server error during profile update" });
  }
});

export default router;
