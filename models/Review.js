const mongoose = require("mongoose")
const { string } = require("yup")

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviewText: {
        type: String,
        required: true,
        minlength: 5
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
})

module.exports = mongoose.model("Review", reviewSchema)