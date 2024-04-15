import mongoose from "mongoose";
import  mongoosePaginate  from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    details: {
      year: {
        type: Number,
        required: true,
      },
      engine: {
        type: String,
        required: true,
      },
      transmission: {
        type: String,
        required: true,
      },
      drivetrain: {
        type: String,
        required: true,
      },
    },
  });

productSchema.plugin(mongoosePaginate)  
  
const productModel = mongoose.model("products", productSchema)

export default productModel 