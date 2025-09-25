// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    // Email is not required if a wallet is connected
    required: function() { return !this.walletAddress; }
  },
  password: {
    type: String,
     // Password is not required if a wallet is connected
    required: function() { return !this.walletAddress; }
  },
  walletAddress: {
    type: String,
    unique: true,
    // Wallet address is not required for email/password signup
    required: function() { return !this.email; }
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Settings'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;