import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },

    role: { 
        type: String, 
        enum: ["admin", "user"], 
        default: "user"
    },

})

const userModel = mongoose.model("users", userSchema)
export default userModel