# ⚡ Token Bucket Rate Limiter

<p align="center">
  <b>A Redis-backed Token Bucket Rate Limiter built with Node.js, Express, and Lua scripting.</b>
  <br/>
  A practical implementation of API rate limiting using Redis for shared state management and Lua scripts for atomic token operations.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js"/>
  <img src="https://img.shields.io/badge/Express.js-Framework-000000?logo=express"/>
  <img src="https://img.shields.io/badge/Redis-In--Memory_Database-DC382D?logo=redis"/>
  <img src="https://img.shields.io/badge/Lua-Scripting-2C2D72?logo=lua"/>
  <img src="https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker"/>
</p>

---

## 📖 About

Rate limiting is an essential mechanism for protecting APIs from excessive requests, abuse, and traffic spikes.

This project implements a **Token Bucket Rate Limiting Algorithm** using Node.js, Express, and Redis.

The implementation maintains token bucket state in Redis and uses Lua scripts to perform token operations atomically. This ensures that concurrent requests cannot independently modify the same bucket state and bypass the configured rate limit.

The project demonstrates how rate limiting can be implemented as reusable Express middleware and integrated into API routes.

---

## ✨ Features

### 🪣 Token Bucket Algorithm

- Implements the Token Bucket rate limiting algorithm.
- Configurable bucket capacity.
- Controlled token refill mechanism.
- Allows temporary bursts of requests within the bucket capacity.
- Rejects requests when sufficient tokens are unavailable.

### ⚡ Redis Integration

- Uses Redis to maintain token bucket state.
- Centralized state management across requests.
- Fast in-memory operations.
- Avoids relying on application-local memory for rate limit tracking.

### 🔒 Atomic Operations with Lua

- Uses Redis Lua scripting for token bucket operations.
- Executes bucket-related operations atomically.
- Prevents race conditions during concurrent requests.
- Keeps the token validation and update logic within Redis.

### 🧩 Express Middleware

- Integrates rate limiting into Express applications.
- Keeps rate-limiting logic separate from route handlers.
- Makes the implementation reusable across multiple API routes.

### 🐳 Docker Support

- Includes Docker Compose configuration for running the required services.
- Simplifies local development and environment setup.

---

## 🧠 Understanding the Token Bucket Algorithm

The Token Bucket algorithm controls the rate of incoming requests using a virtual bucket containing tokens.

Each incoming request consumes one token.

- The bucket starts with a configured number of tokens.
- Every request consumes a token.
- Tokens are replenished over time at a predefined refill rate.
- The bucket cannot exceed its maximum capacity.
- If a request arrives when no tokens are available, it gets rejected.

### Example

Consider a bucket configured with:

| Parameter | Value |
|---|---:|
| Bucket Capacity | 10 tokens |
| Initial Tokens | 10 |
| Refill Rate | 1 token/second |
| Request Cost | 1 token |

**Scenario:**

1. A client sends 5 requests.
2. All 5 requests are accepted.
3. The bucket now contains 5 tokens.
4. Another 5 requests are accepted.
5. The bucket becomes empty.
6. Further requests are rejected until tokens are replenished.

This approach allows short bursts of traffic while controlling the average request rate over time.

---

## ⚙️ How It Works

The application uses Redis as the shared storage layer for token bucket state.

The request lifecycle follows this general flow:

```text
          Incoming HTTP Request
                    |
                    v
             Express Server
                    |
                    v
            Rate Limiter Middleware
                    |
                    v
              Redis Lua Script
                    |
                    v
          Check Available Tokens
                    |
             +------+------+
             |             |
          Tokens          No Tokens
          Available       Available
             |             |
             v             v
       Consume Token    Reject Request
             |             |
             v             v
       Continue to       HTTP 429
       Route Handler    Too Many Requests
```

The Lua script executes the token bucket operation atomically within Redis, helping maintain consistent bucket state under concurrent requests.

---

## 🏗️ Architecture

The project follows a modular structure:

```text
token-bucket-rate-limiter/
│
├── middleware/
│   └──             # Rate limiting middleware
│
├── redis/
│   └──             # Redis connection and operations
│
├── routes/
│   └──             # API route definitions
│
├── app.js          # Express application configuration
├── server.js       # Server entry point
│
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | HTTP server and middleware |
| Redis | In-memory state management |
| Lua | Atomic Redis operations |
| Docker Compose | Container orchestration |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Docker Desktop or Docker Engine
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/anikdotio/token-bucket-rate-limiter.git

cd token-bucket-rate-limiter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Redis Using Docker Compose

```bash
docker compose up -d
```

This starts the services configured in the Docker Compose file.

### 4. Start the Server

```bash
node server.js
```

The application should now be running using the configured server and Redis connection.

---

## 🔍 Why Redis and Lua?

Using an in-memory JavaScript object to maintain token counts can work for a single server instance, but it becomes problematic when an application runs across multiple instances.

Redis provides a centralized state store shared across application instances.

However, simply performing separate Redis operations to read, calculate, and update token counts can introduce race conditions when multiple requests arrive simultaneously.

Lua scripting addresses this by executing the token bucket operation atomically inside Redis.

This makes the implementation more reliable under concurrent request loads.

---

## 📚 Key Concepts Demonstrated

This project explores several important backend engineering concepts:

| Concept | Implementation |
|---|---|
| Rate Limiting | Token Bucket algorithm |
| Middleware Architecture | Express middleware |
| Caching & State Management | Redis |
| Atomic Operations | Redis Lua scripting |
| Concurrency | Atomic bucket updates |
| API Protection | Request throttling |
| Containerization | Docker Compose |

---

## 🔭 Future Improvements

Potential extensions to the project:

- Configurable rate limits per route.
- Per-user and per-IP rate limiting.
- Rate limit response headers.
- Retry-after information for rejected requests.
- Monitoring and request analytics.
- Support for additional rate-limiting algorithms.
- Automated unit and integration tests.
- Load testing under concurrent traffic.

---

## 👨‍💻 Developer

**Anik Kapat**

Electronics & Communication Engineering  
Haldia Institute of Technology

**GitHub:**  
https://github.com/anikdotio

---

<p align="center">
  ⭐ If you found this project useful, consider giving it a star!
  <br/><br/>
  Built with Node.js, Redis, Lua, and ☕.
</p>
