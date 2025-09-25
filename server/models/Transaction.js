// models/Transaction.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['purchase', 'reward', 'refund', 'withdrawal', 'deposit'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,
  relatedDate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NFTDate'
  }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;