import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import allRoutes from "./routes/index.js";

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  "http://localhost:3000", // Local Dev
  "https://winklyy.netlify.app", // Production Frontend (Netlify)
  "https://winkly-app.vercel.app", // Production Frontend (Vercel)
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow if no origin (e.g., non-browser requests like Postman or same-origin requests)
    if (!origin) {
      return callback(null, true);
    }

    // Allow explicitly whitelisted origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow Vercel and Netlify preview domains dynamically
    if (origin.endsWith(".vercel.app") || origin.endsWith(".netlify.app")) {
      return callback(null, true);
    }

    // Reject all other origins
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
// --- Security & Parsers ---
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ES Module __dirname workaround ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Serve Static Files ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB."))
  .catch((err) => console.error("❌ Database connection failed:", err));

// --- API Routes ---
app.use("/api", allRoutes);

// --- Health Check ---
app.get("/", (req, res) => {
  res.status(200).json({ message: "NFT Dating App API is running!" });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);
  res
    .status(err.status || 500)
    .json({ error: err.message || "An unknown error occurred" });
});

// --- Start Server (for local dev) ---
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server live on port ${PORT}`));
}

// Export for Vercel serverless deployment
export default app;
