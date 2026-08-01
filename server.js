require("dotenv").config();

const app = require("./app");
const { connectRedis, loadLuaScript } = require("./redis/tokenBucket");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to Redis
    await connectRedis();

    // Load the Lua script into Redis
    await loadLuaScript();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
