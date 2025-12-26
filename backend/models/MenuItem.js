// models/MenuItem.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: "Misc" },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    isVeg: { type: Boolean, default: false },
    popularity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
