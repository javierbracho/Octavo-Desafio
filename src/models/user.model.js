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
        enum: ["admin", "user", "premium"], 
        default: "user"
    },

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },

    resetToken: {
        token: String,
        expiresAt: Date,
    },

    documents: [{
        name: String,
        reference: String
    }],
    
    last_connection: {
        type: Date,
        default: Date.now
    }
})
userSchema.pre('findOne', function (next) {
    this.populate('cart', '_id');
    next();
  });
const userModel = mongoose.model("users", userSchema)
export default userModel