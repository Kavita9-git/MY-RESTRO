import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL
  title: { type: String },
  subtitle: { type: String },
  link: { type: String } // optional link
}, { timestamps: true });

export default mongoose.model("Banner", bannerSchema);
