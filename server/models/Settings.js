// models/Settings.js
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notifications: {
    matches: { type: Boolean, default: true },
    messages: { type: Boolean, default: true },
    nftUpdates: { type: Boolean, default: true },
    dateReminders: { type: Boolean, default: true },
    sound: { type: Boolean, default: true },
    vibration: { type: Boolean, default: false }
  },
  privacy: {
    showOnline: { type: Boolean, default: true },
    showDistance: { type: Boolean, default: true },
    showNFTBalance: { type: Boolean, default: false },
    incognito: { type: Boolean, default: false }
  },
  discovery: {
    showMe: { type: Boolean, default: true },
    ageRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 55 }
    },
    maxDistance: { type: Number, default: 50 }, // in km
    showRecentlyActive: { type: Boolean, default: true }
  },
  blockchain: {
    autoWithdraw: { type: Boolean, default: false },
    withdrawThreshold: { type: Number, default: 10 },
    showTransactions: { type: Boolean, default: true }
  }
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;