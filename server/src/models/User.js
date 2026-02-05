const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: { type: String, unique: true },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
