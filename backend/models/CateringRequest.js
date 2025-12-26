// models/CateringRequest.js
import mongoose from "mongoose";

const cateringRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    eventType: { type: String },
    location: { type: String },
    date: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["new", "in-progress", "completed", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("CateringRequest", cateringRequestSchema);
