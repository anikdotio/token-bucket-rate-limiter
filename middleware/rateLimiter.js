const { checkRateLimit } = require("../redis/tokenBucket");

async function rateLimiter(req, res, next) {
  try {
    const ip = req.ip.replace("::ffff:", "");
    const userId = `user:${ip}`;

    console.log("🛡️ Rate limiter hit for:", userId);

  checkRateLimit(
    userId,
    Number(process.env.BUCKET_CAPACITY),
    Number(process.env.REFILL_RATE),
  );

    // Optional but recommended
    res.set({
      "X-RateLimit-Limit": "10",
      "X-RateLimit-Remaining": remainingTokens.toString(),
    });

    if (!allowed) {
      res.set({
        "Retry-After": "1",
      });
      return res.status(429).json({
        success: false,
        message: "Too Many Requests",
      });
    }

    next();
  } catch (err) {
    console.error("Rate Limiter Error:", err);
    next(err);
  }
}

module.exports = rateLimiter;
