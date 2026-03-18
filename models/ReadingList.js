const mongoose = require("mongoose")

const readingListSchema = new mongoose.Schema({
    bookId: { type: String, required: true },
    bookTitle: { type: String, required: true },
    bookImage: { type: String },
    status: {
        type: String,
        enum: ["want_to_read", "reading", "done"],
        default: "want_to_read"
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true })

module.exports = mongoose.model("ReadingList", readingListSchema)