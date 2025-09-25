// models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  nftDate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NFTDate'
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;