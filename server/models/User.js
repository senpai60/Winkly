// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, lowercase: true, match: /^[a-z0-9\-_]{3,30}$/ },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: { validator: v => !v || /\S+@\S+\.\S+/.test(v), message: "Invalid email" },
    required: function () { return !this.walletAddress; },
    // unique handled by index below (partial)
  },
  password: {
    type: String,
    required: function () { return !this.walletAddress; },
    select: false, // won't be returned by default
  },
  walletAddress: {
    type: String,
    trim: true,
    required: function () { return !this.email; },
  },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  settings: { type: mongoose.Schema.Types.ObjectId, ref: "Settings" },
  roles: { type: [String], default: ["user"] },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// INDEXES (use partialFilterExpression for optional unique fields)
userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } });
userSchema.index({ walletAddress: 1 }, { unique: true, partialFilterExpression: { walletAddress: { $type: "string" } } });
// compound index example
userSchema.index({ username: 1, createdAt: -1 });

// virtual
userSchema.virtual("displayName").get(function () {
  return this.username || this.fullname;
});

// pre-save: hash password if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (!this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// instance method
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// to hide sensitive fields in JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.model("User", userSchema);
export default User;
