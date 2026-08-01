local key = KEYS[1]

local bucket = redis.call("HMGET", key, "tokens", "last_refill")

local tokens = tonumber(bucket[1])
local last_refill = tonumber(bucket[2])

if not tokens then
    tokens = tonumber(ARGV[1])
    last_refill = tonumber(ARGV[3])

    redis.call(
        "HMSET",
        key,
        "tokens",
        tokens,
        "last_refill",
        last_refill
    )
end

local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local current_time = tonumber(ARGV[3])

local elapsed = current_time - last_refill

local refill = math.floor(elapsed * refill_rate / 1000)

if refill > 0 then
    tokens = math.min(capacity, tokens + refill)
    last_refill = current_time
end

if tokens <= 0 then
    return {0, tokens}
end

tokens = tokens - 1

redis.call(
    "HMSET",
    key,
    "tokens",
    tokens,
    "last_refill",
    last_refill
)

return {1, tokens}