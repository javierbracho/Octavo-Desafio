import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
})

const ticketModel = mongoose.model("ticket", ticketSchema)

export default ticketModel