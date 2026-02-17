const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },

  passwordHash: String,
  googleId: String,
  avatar: String,
  gender: String,
  dateOfBirth: Date,

  addresses: [
    {
      fullName: String,
      phone: String,
      pincode: String,
      state: String,
      city: String,
      house: String,
      area: String,
      type: { type: String, enum: ["home", "work"] }
    }
  ],

  savedUpi: [String],
  savedCards: [
    {
      last4: String,
      brand: String,
      token: String
    }
  ],

  isVerified: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
