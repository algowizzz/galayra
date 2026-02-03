const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body

  const hashedPassword = bcrypt.hashSync(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  res.status(201).json({ message: "User registered" })
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: "Invalid credentials" })

  const match = bcrypt.compareSync(password, user.password)
  if (!match) return res.status(400).json({ message: "Invalid credentials" })

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token })
}

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password")
  res.json(user)
}
