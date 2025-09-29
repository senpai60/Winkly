// routes/users.js
import express from "express";
import bcrypt from "bcryptjs"; // consistent with schema
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

// --- Placeholder auth middleware ---
const auth = (req, res, next) => {
  // In real app, verify JWT here
  req.user = { id: "some-user-id" }; // Mock user
  next();
};

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
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // <-- Just pass password; schema will hash it
    const newUser = await User.create({ fullname, username, email, password });

    const token = jwt.sign({ userid: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: false,
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
    // +password because select: false in schema
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/users/me
// @desc    Get current user's data
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
