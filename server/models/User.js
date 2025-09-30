import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  username: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true, 
    // This now allows letters, numbers, underscore, hyphen, and dot
    match: /^[a-zA-Z0-9\-_.]+$/, 
    minlength: 3, 
    maxlength: 30 
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: { validator: v => !v || /\S+@\S+\.\S+/.test(v), message: "Invalid email" },
    required: function () { return !this.walletAddress; },
  },
  password: {
    type: String,
    required: function () { return !this.walletAddress; },
    select: false,
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

// INDEXES
userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } });
userSchema.index({ walletAddress: 1 }, { unique: true, partialFilterExpression: { walletAddress: { $type: "string" } } });
userSchema.index({ username: 1 }, { unique: true });

// VIRTUAL
userSchema.virtual("displayName").get(function () {
  return this.username || this.fullname;
});

// PRE-SAVE HOOK
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// INSTANCE METHOD
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// TOJSON METHOD
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.model("User", userSchema);
export default User;