const { createClient } = require("redis");
const fs = require("fs");
const path = require("path");

// -------------------- Redis Client --------------------

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

// -------------------- Lua Script --------------------

const luaScript = fs.readFileSync(path.join(__dirname, "bucket.lua"), "utf8");

let scriptSha;

// -------------------- Redis Connection --------------------

async function connectRedis() {
  await client.connect();
  console.log("✅ Connected to Redis");
}

// -------------------- Lua Script Loader --------------------

async function loadLuaScript() {
  scriptSha = await client.scriptLoad(luaScript);
  console.log("📜 Lua script loaded:", scriptSha);
}

// -------------------- Rate Limiter --------------------

async function checkRateLimit(userId, capacity, refillRate) {
  const result = await client.evalSha(scriptSha, {
    keys: [userId],
    arguments: [
      capacity.toString(),
      refillRate.toString(),
      Date.now().toString(),
    ],
  });

  return result;
}

// -------------------- Exports --------------------

module.exports = {
  client,
  connectRedis,
  loadLuaScript,
  checkRateLimit,
};
