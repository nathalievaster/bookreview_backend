const express = require("express")
const router = express.Router()
const Review = require("../models/Review")
const { authMiddleware } = require("../middleware/authMiddleware")

// Hämta alla ens reviews
router.get("/myreviews", authMiddleware, async (req, res) => {
  try {

    const reviews = await Review.find({ user: req.user.id })
      .sort({ createdAt: -1 })

    res.json(reviews)

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// Hämta reviews för en bok
router.get("/:bookId", async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId})
        .populate("user", "username") // När man hämtar reviews så ska inte password följa med
        res.json(reviews)
    } catch (err) {
        res.status(500).json({ message: "Server error"})
    }
})

// Skapa en review
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { bookId, bookTitle, reviewText, rating } = req.body
        
        const review = new Review({
            bookId,
            bookTitle,
            reviewText,
            rating,
            user: req.user.id
        })

        await review.save()
        res.status(201).json(review)
    } catch (err) {
        res.status(500).json({ message: "Det gick inte att skapa recension."})
    }
})

// Uppdatera en review
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)

        if (!review) {
            return res.status(404).json({ message: "Kunde inte hitta recensionen."})
        }

        review.reviewText = req.body.reviewText || review.reviewText
        review.rating = req.body.rating || review.rating
        review.updatedAt = Date.now()

        await review.save()
        res.json(review)
    } catch (err) {
        res.status(500).json({ message: "Det gick inte att uppdatera recensionen."})
    }
})

// Radera en recension
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)

        if (!review) {
            return res.status(404).json({ message: "Kunde inte hitta recensionen."})
        }

        // Bara admin eller recensionsägaren kan radera

        if (
            review.user.toString() !==req.user.id && req.user.role !== "admin"
        ) {
            return res.status(403).json({ message: "Du har inte rätt behörighet för att radera denna recension."})
        }

        await review.deleteOne()
        res.json({ message: "Recension är raderad."})
    } catch (err) {
        res.status(500).json({ message: "Det gick inte att radera recensionen."})
    }
})

module.exports = router
