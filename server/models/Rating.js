// models/Rating.js
import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  rater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nftDate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NFTDate',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: String
}, { timestamps: true });

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;