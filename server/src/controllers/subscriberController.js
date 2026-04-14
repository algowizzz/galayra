const Subscriber = require("../models/Subscriber")

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body

    const exists = await Subscriber.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "Already subscribed" })
    }

    await Subscriber.create({ email })

    res.json({ message: "Subscribed successfully" })
  } catch {
    res.status(500).json({ message: "Error subscribing" })
  }
}