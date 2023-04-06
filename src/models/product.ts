import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  categories: {
    type: [String],
    require: true,
  },
  qty: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
