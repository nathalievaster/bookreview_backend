const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Registrera användare
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Användaren finns redan." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: "user"
        })

        await user.save()

        res.status(201).json({ message: "Användare skapad!" })

    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

// Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Ogiltiga inloggningsuppgifter." })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Ogiltiga inloggningsuppgifter." })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({ token })

    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router