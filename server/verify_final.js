import mongoose from "mongoose";
import dotenv from "dotenv";
import Profile from "./models/Profile.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const run = async () => {
  try {
    console.log(`Testing URI: ${MONGO_URI.replace(/:([^:@]{1,})@/, ":****@")}`);
    await mongoose.connect(MONGO_URI);
    console.log(`✅ Connected to DB: "${mongoose.connection.name}"`);

    const count = await Profile.countDocuments();
    console.log(`Stats: Found ${count} profiles.`);

    if (mongoose.connection.name === "winkly" && count > 0) {
      console.log("🎉 Fix Verified: Connected to correct DB with data.");
    } else {
      console.log("⚠️ Warning: Connected but might be wrong DB or empty.");
    }
  } catch (err) {
    console.error("❌ Connection Failed:", err.message);
  } finally {
    if (mongoose.connection.readyState === 1) await mongoose.disconnect();
  }
};

run();
