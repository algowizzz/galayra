const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = user =>
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      if (user.status === "deleted")
        return res.status(403).json({ message: "Account was deleted. Contact support." })
      if (!user.passwordHash) {
        const passwordHash = await bcrypt.hash(password, 10)
        user.passwordHash = passwordHash
        user.provider = "local"
        await user.save()
        return res.status(200).json({
          message: "Password added. You can login with email now.",
          token: signToken(user)
        })
      }
      return res.status(409).json({
        message: "Account already exists. Please login."
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    user = await User.create({
      name,
      email,
      passwordHash,
      provider: "local"
    })
    res.status(201).json({
      message: "Account created",
      token: signToken(user)
    })
  } catch {
    res.status(500).json({ message: "Registration failed" })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user)
      return res.status(404).json({
        message: "Email not registered. Please create an account."
      })
    if (user.status === "deleted")
      return res.status(403).json({
        message: "Account deleted"
      })
    if (!user.passwordHash)
      return res.status(400).json({
        message: "This account uses Google login. Continue with Google."
      })
    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match)
      return res.status(401).json({ message: "Incorrect password" })
    res.status(200).json({ token: signToken(user) })
  } catch {
    res.status(500).json({ message: "Login failed" })
  }
}

exports.getMe = async (req, res) => {
  const user = await User.findById(req.userId).select("-passwordHash")
  res.json(user)
}

exports.updateProfile = async (req, res) => {
  const allowed = ["name", "avatar", "gender", "dateOfBirth", "phone"]
  const updates = {}
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      updates[key] = req.body[key]
    }
  }
  const user = await User.findById(req.userId)
  Object.assign(user, updates)
  await user.save()
  res.json(user.toObject({ versionKey: false, transform: (_, ret) => {
    delete ret.passwordHash
    return ret
  }}))
}

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const user = await User.findById(req.userId)

  if (!user.passwordHash)
    return res.status(400).json({ message: "Google account cannot change password" })
  const match = await bcrypt.compare(oldPassword, user.passwordHash)

  if (!match)
    return res.status(401).json({ message: "Old password incorrect" })
  user.passwordHash = await bcrypt.hash(newPassword, 10)
  await user.save()
  res.json({ message: "Password updated" })
}

exports.addAddress = async (req, res) => {
  const user = await User.findById(req.userId)
  if (req.body.isDefault)
    user.addresses.forEach(a => (a.isDefault = false))
  user.addresses.push(req.body)
  await user.save()
  res.json(user.addresses)
}

exports.deleteAddress = async (req, res) => {
  const user = await User.findById(req.userId)
  user.addresses = user.addresses.filter(
    a => a._id.toString() !== req.params.id
  )
  await user.save()
  res.json(user.addresses)
}

exports.setDefaultAddress = async (req, res) => {
  const user = await User.findById(req.userId)
  user.addresses.forEach(a => {
    a.isDefault = a._id.toString() === req.params.id;
  })
  await user.save()
  res.json(user.addresses)
}

exports.deleteAccount = async (req, res) => {
  const user = await User.findById(req.userId)
  user.status = "deleted"
  user.email = `deleted_${Date.now()}@deleted.com`
  user.googleId = undefined
  user.passwordHash = undefined
  await user.save()
  res.json({ message: "Account deleted" })
}
