require("dotenv").config()
const app = require("./app")
const connectDB = require("./config/db")

const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log(
  "PRINTIFY KEY:",
  process.env.PRINTIFY_API_KEY ? "LOADED" : "MISSING"
)
