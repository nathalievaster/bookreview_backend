const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        return res.status(401).json({ message: "Ingen token, autorisering misslyckades..." })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Token är ogiltig." })
    }
}

const adminMiddleware = async (req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin-behörighet krävs." })
    }

    next()
}

module.exports = { authMiddleware, adminMiddleware }