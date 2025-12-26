// routes/cateringRoutes.js
import express from "express";
import {
  createCatering,
  getCateringRequests,
  updateCateringStatus,
  deleteCateringRequest,
} from "../controllers/cateringController.js";

const router = express.Router();

// Catering Routes
router.post("/", createCatering);                    // POST /api/catering
router.get("/", getCateringRequests);                // GET /api/catering
router.put("/:id", updateCateringStatus);            // PUT /api/catering/:id
router.delete("/:id", deleteCateringRequest);        // DELETE /api/catering/:id

export default router;
