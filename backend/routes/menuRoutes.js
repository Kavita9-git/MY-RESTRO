// routes/menuRoutes.js
import express from "express";
import {
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

// Menu Routes
router.post("/", addMenuItem);              // POST /api/menu
router.get("/", getMenuItems);              // GET  /api/menu
router.put("/:id", updateMenuItem);         // PUT  /api/menu/:id
router.delete("/:id", deleteMenuItem);      // DELETE /api/menu/:id

export default router;
