import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
  },
  dob: {
    type: Date,
    required: true // DOB is now required
  },
  gender: {
    type: String,
    required: true // Gender is now required
  },
  interestedIn: [{
    type: String,
  }],
  images: [{
    type: String,
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
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// VIRTUAL for AGE
profileSchema.virtual('age').get(function() {
  if (!this.dob) {
    return null;
  }
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;