const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  label: { type: String, enum: ["home", "work", "other"], default: "home" },
  fullName: String,
  phone: String,
  pincode: String,
  state: String,
  city: String,
  house: String,
  area: String,
  landmark: String,
  isDefault: { type: Boolean, default: false }
}, { _id: true });

const upiSchema = new mongoose.Schema({
  upiId: String,
  isPrimary: { type: Boolean, default: false }
}, { _id: true });

const cardSchema = new mongoose.Schema({
  last4: String,
  brand: String,
  token: String,
  isPrimary: { type: Boolean, default: false }
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  avatar: String,
  passwordHash: String,
  googleId: String,
  provider: { type: String, enum: ["local", "google"], default: "local" },
  gender: { type: String, enum: ["male", "female", "other", ""], default: "" },
  dateOfBirth: Date,
  addresses: [addressSchema],
  upi: [upiSchema],
  cards: [cardSchema],
  status: {
    type: String,
    enum: ["active", "disabled", "deleted"],
    default: "active"
  },

  isVerified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
