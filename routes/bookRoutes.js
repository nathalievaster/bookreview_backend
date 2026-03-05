const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

// Spara bok lokalt
router.post("/", async (req, res) => {
    try {
        const { googleId, title, authors, thumbnail, description } = req.body

        const existingBook = await Book.findOne({ googleId })
        if (existingBook) {
            return res.json(existingBook)
        }

        const book = new Book({
            googleId,
            title,
            authors,
            thumbnail,
            description
        })

        await book.save()
        res.status(201).json(book)

    } catch (err) {
        res.status(500).json({ message: "Could not save book" })
    }
})

module.exports = router