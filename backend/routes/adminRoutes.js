import express from "express";
const router = express.Router();

// Temporary login credentials (you can store in .env later)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "1234";

// ✅ POST /api/login — Admin Login Route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // You can later generate a JWT token here
    res.json({ success: true, message: "Login successful", token: "dummy_token_12345" });
  } else {
    res.status(401).json({ success: false, message: "Invalid username or password" });
  }
});

// ✅ GET /api/admin — Test route
router.get("/", (req, res) => {
  res.json({ success: true, message: "👨‍💼 Admin API is working successfully!" });
});

export default router;
