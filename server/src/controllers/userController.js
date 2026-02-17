const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = user =>
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      if (!user.passwordHash) {
        const passwordHash = await bcrypt.hash(password, 10);
        user.passwordHash = passwordHash;
        await user.save();
        return res.json({
          message: "Password added successfully. You can now login with email/password.",
          token: signToken(user)
        });
      }
      return res.status(400).json({
        message: "Account already exists. Please login."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      passwordHash
    });
    res.json({
      message: "Account created successfully",
      token: signToken(user)
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Account doesn't exist. Please sign up."
      });
    }

    if (!user.passwordHash) {
      return res.status(400).json({
        message: "This account uses Google login. Continue with Google."
      });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    res.json({ token: signToken(user) });

  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.userId).select("-passwordHash");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { $set: req.body },
    { new: true }
  ).select("-passwordHash");

  res.json(user);
};
