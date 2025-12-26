// routes/tableRoutes.js
import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/tableController.js";

const router = express.Router();

// Table Booking Routes
router.post("/", createBooking);          // POST /api/tables
router.get("/", getBookings);             // GET  /api/tables
router.put("/:id", updateBooking);        // PUT  /api/tables/:id
router.delete("/:id", deleteBooking);     // DELETE /api/tables/:id

export default router;
