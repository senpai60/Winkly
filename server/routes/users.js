// routes/users.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Settings from "../models/Settings.js";
import Profile from "../models/Profile.js";

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  const { fullname, username, email, password } = req.body;
  if (!fullname || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const newUser = await User.create({ fullname, username, email, password });

    await Profile.create({ user: newUser._id, name: fullname, images: [] });
    await Settings.create({ user: newUser._id });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("✅ Token created on register:", token);
    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: false, // Set to true in production
    });

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // *** THE FIX IS HERE ***
    // Use 'id' to be consistent with the register route and auth middleware
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: false, // Set to true in production
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;