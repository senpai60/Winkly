import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Settings from "../models/Settings.js";
import Profile from "../models/Profile.js";

const router = express.Router();

// @route   POST /api/users/register
router.post("/register", async (req, res) => {
  const { fullname, username, email, password, dob, gender, interestedIn } =
    req.body;

  if (
    !fullname ||
    !username ||
    !email ||
    !password ||
    !dob ||
    !gender ||
    !interestedIn ||
    interestedIn.length === 0
  ) {
    return res
      .status(400)
      .json({
        message:
          "Please fill all required fields, including DOB, gender, and at least one interest.",
      });
  }

  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18) {
    return res
      .status(400)
      .json({ message: "You must be at least 18 years old." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use." });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username is already taken." });
    }

    const newUser = await User.create({ fullname, username, email, password });

    await Profile.create({
      user: newUser._id,
      name: fullname,
      dob: birthDate,
      gender: gender,
      interestedIn: interestedIn,
      images: [],
    });

    await Settings.create({ user: newUser._id });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error during registration." });
  }
});

// @route   POST /api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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

// @route   POST /api/users/logout
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error during logout" });
  }
});

export default router;
