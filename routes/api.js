const express = require("express");
const router = express.Router();

const rateLimiter = require("../middleware/rateLimiter");

// Health Check (No Rate Limiting)
router.get("/", (req, res) => {
  res.status(200).json({
    name: "Token Bucket Rate Limiter",
    status: "Running",
  });
});

// Demo Route (Protected by Rate Limiter)
router.get("/api/test", rateLimiter, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Request Allowed",
  });
});

module.exports = router;
