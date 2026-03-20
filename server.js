require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/books", require("./routes/bookRoutes"))
app.use("/api/reviews", require("./routes/reviewRoutes"))
app.use("/api/readinglist", require("./routes/ReadingListRoutes"))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => {
    console.log("MongoDB connection error:", err)
    process.exit(1)
  })