const express = require("express")
const router = express.Router()
const ReadingList = require("../models/ReadingList")
const { authMiddleware } = require("../middleware/authMiddleware")

// Hämta min läslista
router.get("/", authMiddleware, async (req, res) => {
  try {
    const list = await ReadingList.find({ user: req.user.id })
      .sort({ createdAt: -1 })

    res.json(list)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// Lägg till bok i läslista
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { bookId, bookTitle, bookImage, status } = req.body

    const entry = new ReadingList({
      bookId,
      bookTitle,
      bookImage,
      status,
      user: req.user.id
    })

    await entry.save()
    res.status(201).json(entry)
  } catch (err) {
    res.status(500).json({ message: "Det gick inte att lägga till boken." })
  }
})

// Uppdatera status
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const entry = await ReadingList.findById(req.params.id)

    if (!entry) {
      return res.status(404).json({ message: "Kunde inte hitta boken i läslistan." })
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Du har inte rätt behörighet." })
    }

    entry.status = req.body.status || entry.status

    await entry.save()
    res.json(entry)
  } catch (err) {
    res.status(500).json({ message: "Det gick inte att uppdatera status." })
  }
})

// Radera från läslista
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const entry = await ReadingList.findById(req.params.id)

    if (!entry) {
      return res.status(404).json({ message: "Kunde inte hitta boken i läslistan." })
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Du har inte rätt behörighet." })
    }

    await entry.deleteOne()
    res.json({ message: "Boken är borttagen från läslistan." })
  } catch (err) {
    res.status(500).json({ message: "Det gick inte att radera boken." })
  }
})

module.exports = router