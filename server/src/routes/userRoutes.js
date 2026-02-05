const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateProfile
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

module.exports = router;
