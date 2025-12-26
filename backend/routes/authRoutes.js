import express from "express";

const router = express.Router();

// ✅ Login route (POST)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Temporary static login check (for testing)
  if (username === "admin" && password === "1234") {
    return res.json({
      success: true,
      message: "✅ Login successful!",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "❌ Invalid credentials!",
    });
  }
});

export default router;
