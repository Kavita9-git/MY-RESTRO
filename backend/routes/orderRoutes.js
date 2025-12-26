// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Order Routes
router.post("/", createOrder);              // POST /api/orders
router.get("/", getOrders);                 // GET  /api/orders
router.put("/:id", updateOrderStatus);      // PUT  /api/orders/:id

export default router;
