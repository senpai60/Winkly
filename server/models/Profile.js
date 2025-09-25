// models/Profile.js
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  tagline: String,
  about: String,
  lookingFor: String,
  interests: [String],
  nftStats: {
    profileViews: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    nftDates: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 }
  }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;