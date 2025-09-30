// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const auth = async (req, res, next) => {
  try {
    // Authorization header check
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract token
    const token = authHeader.replace("Bearer ", "");

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Invalid token, user not found" });
    }

    // Attach user to request
    req.user = user;

    console.log("✅ Authentication successful for user:", user.email);
    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error.message);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;
