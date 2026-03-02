const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    authors: [String],
    thumbnail: String,
    description: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Book", bookSchema)