const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  addAddress,
  deleteAddress,
  setDefaultAddress,
  deleteAccount
} = require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", authMiddleware, getMe)
router.put("/profile", authMiddleware, updateProfile)
router.put("/change-password", authMiddleware, changePassword)
router.post("/address", authMiddleware, addAddress)
router.delete("/address/:id", authMiddleware, deleteAddress)
router.put("/address/default/:id", authMiddleware, setDefaultAddress)
router.delete("/delete", authMiddleware, deleteAccount)

module.exports = router;
