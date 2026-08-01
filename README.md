🚀 Token Bucket Rate Limiter

A production-style distributed Token Bucket Rate Limiter built with Node.js, Express.js, Redis, Lua Scripts, and Docker.

Overview

This project demonstrates how to build a distributed rate limiter using the Token Bucket Algorithm. The bucket state is stored in Redis and updated atomically through a Lua script, preventing race conditions when multiple application instances access the same bucket.

Features

Distributed token bucket implementation

Atomic Redis operations using Lua

Express middleware integration

Docker & Docker Compose support

Configurable through environment variables

Standard HTTP 429 handling

Rate-limit response headers

Health endpoint

Tech Stack

Node.js

Express.js

Redis

Lua

Docker

Docker Compose

Architecture

Client
   │
   ▼
Express Route
   │
   ▼
Rate Limiter Middleware
   │
   ▼
Lua Script (Atomic)
   │
   ▼
Redis
   │
 ┌─┴───────────────┐
 ▼                 ▼
200 OK        429 Too Many Requests

Token Bucket Algorithm

Every client owns a bucket.

Bucket starts with a fixed number of tokens.

Every request consumes one token.

Tokens refill at a constant rate.

If no token is available, HTTP 429 is returned.

Project Structure

token-rate-limiter/
│
├── middleware/
│   └── rateLimiter.js
├── redis/
│   ├── bucket.lua
│   └── tokenBucket.js
├── routes/
│   └── api.js
├── app.js
├── server.js
├── docker-compose.yml
├── .env.example
├── package.json
├── README.md
└── LICENSE

Environment Variables

Create .env:

PORT=3000
REDIS_URL=redis://localhost:6379
BUCKET_CAPACITY=10
REFILL_RATE=1

Installation

Clone

git clone <YOUR_REPOSITORY_URL>
cd token-rate-limiter

Install

npm install

Copy environment

Linux/macOS:

cp .env.example .env

Windows PowerShell:

copy .env.example .env

Start Redis

docker compose up -d

Run

npm run dev

Server:

http://localhost:3000

API

Health

GET /

Response

{
  "name":"Token Bucket Rate Limiter",
  "status":"Running"
}

Rate Limited Endpoint

GET /api/test

Successful response

{
  "success": true,
  "message": "Request Allowed"
}

Rejected response

HTTP 429

{
  "success": false,
  "message": "Too Many Requests"
}

Testing

Browser

http://localhost:3000/api/test

Refresh repeatedly.

cURL

curl http://localhost:3000/api/test

Loop (Linux/macOS):

for i in {1..15}; do curl http://localhost:3000/api/test; echo; done

PowerShell

1..15 | ForEach-Object {
    Invoke-RestMethod http://localhost:3000/api/test
}

Thunder Client / Postman

Method:

GET

URL

http://localhost:3000/api/test

No request body required.

Expected:

Initial requests → 200

After bucket empty → 429

Response Headers

X-RateLimit-Limit
X-RateLimit-Remaining
Retry-After

Example

X-RateLimit-Limit: 10
X-RateLimit-Remaining: 6

Verify Redis

Open CLI

docker exec -it redis-server redis-cli

List keys

KEYS *

Inspect bucket

HGETALL "user:127.0.0.1"

Example

tokens
7
last_refill
1785509661420

Docker Commands

Start

docker compose up -d

Stop

docker compose down

Logs

docker compose logs

Performance Test

Install

npm install -g autocannon

Run

autocannon -c 50 -d 10 http://localhost:3000/api/test

Screenshots

Add screenshots for:

Home endpoint

Successful request

HTTP 429 response

Redis bucket

Docker Desktop

Future Improvements

User-specific limits

JWT-based limits

Sliding Window algorithm

Redis Cluster

Prometheus metrics

Grafana dashboard

Lessons Learned

Why Redis is ideal for distributed rate limiting.

Why Lua scripts prevent race conditions.

How lazy refill works.

Difference between Token Bucket, Fixed Window, and Sliding Window.

Contributing

Fork

Create a branch

Commit

Push

Open a Pull Request

License

MIT License

Author

Anik Kapat

If you found this project useful, consider giving it a ⭐ on GitHub.
