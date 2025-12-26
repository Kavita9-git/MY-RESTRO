// routes/bannerRoutes.js
import express from "express";
import {
  addBanner,
  getBanners,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

// Banner Routes
router.post("/", addBanner);          // POST /api/banners
router.get("/", getBanners);          // GET  /api/banners
router.delete("/:id", deleteBanner);  // DELETE /api/banners/:id

export default router;
