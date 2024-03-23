import mongoose from "mongoose";
import Market from "./market.model.js";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    finished: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    market: {
        type: Market.schema,
        ref: "Market",
        required: false
    }
},{
    timestamps: true
})

export default mongoose.model("Task", taskSchema)