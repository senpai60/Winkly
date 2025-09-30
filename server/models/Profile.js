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
    // required: false (by default)
  },
  age: {
    type: Number,
    // required: false (by default)
  },
  images: [{
    type: String,
    // required: false (by default)
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