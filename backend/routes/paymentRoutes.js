// routes/paymentRoutes.js
import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// Payment Routes (Razorpay)
router.post("/create-order", createPaymentOrder);   // POST /api/payment/create-order
router.post("/verify", verifyPayment);              // POST /api/payment/verify

export default router;
