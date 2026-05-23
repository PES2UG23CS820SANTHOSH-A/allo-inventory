# Allo Inventory — Engineering Take-Home Exercise

A Next.js 14 inventory reservation platform that solves the checkout race condition for multi-warehouse retail and D2C brands.

## Live Demo

🚀 **[https://allo-inventory-2.onrender.com](https://allo-inventory-2.onrender.com)**

> Note: Hosted on Render's free tier — the app may take ~30 seconds to wake up on the first request after inactivity. This is expected free-tier behaviour.

---

## How to Run Locally

### Prerequisites
- Node.js 18+
- A hosted PostgreSQL database (Neon, Supabase, or Railway — all free tiers work)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/PES2UG23CS820SANTHOSH-A/allo-inventory
cd allo-inventory/allo_health

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your DATABASE_URL
```

Your `.env.local` should look like:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
CRON_SECRET="any-random-string"
```

```bash
# 4. Push schema to your database (creates all tables)
npx prisma db push

# 5. Seed the database with sample data
npm run db:seed

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> **Note on seeding in production (Render free tier):** Render's free tier does not allow persistent shell access between deploys. To seed, go to the **Shell** tab in the Render dashboard right after deployment and run `npm run db:seed`. The database is persistent — seeding only needs to be done once.

---

## How the Expiry Mechanism Works in Production

Reservations hold stock for **10 minutes**. Two mechanisms work together:

### 1. Lazy Cleanup (always active)
Every `GET /api/products` and `GET /api/reservations/:id` call checks for expired `PENDING` reservations and releases them atomically in a database transaction. Stock returns to the available pool within one page refresh — zero infrastructure needed.

### 2. Cron Endpoint
A protected endpoint `GET /api/cron/release-expired` can be called by a cron runner every 5 minutes:
Schedule: */5 * * * *
Command: curl -H "X-Cron-Secret: YOUR_SECRET" https://allo-inventory-2.onrender.com/api/cron/release-expired

It requires the `X-Cron-Secret` header matching the `CRON_SECRET` environment variable. It finds all `PENDING` reservations where `expiresAt <= now()`, marks them `EXPIRED`, and decrements the `reserved` count on `Stock`.

The dual approach means: even if the cron misses a cycle, the next product page load cleans up automatically.

---

## Concurrency Strategy

The core problem: two users simultaneously trying to reserve the last unit.

**Solution: PostgreSQL Serializable Transactions**
User A ──┐
├──► POST /api/reservations (same product, same warehouse, same time)
User B ──┘
Inside the transaction (isolationLevel: "Serializable"):

Read stock → available = total - reserved
Check available >= requested quantity
Increment reserved
Create reservation record

Result: Exactly one succeeds (201), the other gets a 409

PostgreSQL Serializable isolation detects conflicting concurrent reads/writes and aborts one transaction — no phantom reads, no lost updates. Correct under concurrency without needing Redis.

---

## Idempotency (Bonus)

`POST /api/reservations` and `POST /api/reservations/:id/confirm` both support the `Idempotency-Key` header.

**How it works:**
1. Client sends request with `Idempotency-Key: <uuid>`
2. Server checks the `IdempotencyKey` table for this key
3. If found → return stored response immediately (no side effects repeated)
4. If not found → execute operation, store `{ key, responseBody, statusCode }`, return response

This allows payment clients to safely retry on network timeout without double-reserving.

---

## API Reference

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/products` | List all products with available stock per warehouse |
| `GET` | `/api/warehouses` | List all warehouses |
| `POST` | `/api/reservations` | Reserve units. Body: `{ productId, warehouseId, quantity }`. Returns `409` if insufficient stock. Supports `Idempotency-Key`. |
| `GET` | `/api/reservations/:id` | Get reservation details (also triggers lazy expiry check) |
| `POST` | `/api/reservations/:id/confirm` | Confirm purchase. Returns `410` if expired. Supports `Idempotency-Key`. |
| `POST` | `/api/reservations/:id/release` | Release reservation early |
| `GET` | `/api/cron/release-expired` | Cron-triggered expiry cleanup. Requires `X-Cron-Secret` header. |

---

## Project Structure
allo_health/
├── src/
│   ├── app/
│   │   ├── page.tsx                          # Product listing page
│   │   ├── checkout/[id]/page.tsx            # Checkout & reservation page
│   │   └── api/
│   │       ├── products/route.ts             # GET /api/products
│   │       ├── warehouses/route.ts           # GET /api/warehouses
│   │       ├── reservations/
│   │       │   ├── route.ts                  # POST /api/reservations
│   │       │   └── [id]/
│   │       │       ├── route.ts              # GET /api/reservations/:id
│   │       │       ├── confirm/route.ts      # POST /api/reservations/:id/confirm
│   │       │       └── release/route.ts      # POST /api/reservations/:id/release
│   │       └── cron/
│   │           └── release-expired/route.ts  # GET /api/cron/release-expired
│   └── lib/
│       ├── prisma.ts                         # Prisma client singleton
│       ├── expiry.ts                         # Expiry release logic
│       ├── redis.ts                          # Lock interface (no-op without Redis)
│       └── schemas.ts                        # Zod validation schemas
├── prisma/
│   ├── schema.prisma                         # Database schema
│   └── seed.ts                               # Sample data seeder
└── package.json

---

## Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework |
| **TypeScript** | End-to-end type safety |
| **Prisma** | ORM and database client |
| **PostgreSQL** (Render) | Hosted database |
| **Zod** | Request validation |
| Custom CSS | Styling |

---

## Trade-offs & What I'd Do Differently

### Trade-offs made
- **No Redis** — PostgreSQL Serializable transactions handle concurrency correctly at this scale. Redis would add throughput at very high concurrency but adds operational complexity.
- **No auth/sessions** — Reservations are accessed by ID in the URL. A production system would tie reservations to authenticated user sessions.
- **No pricing** — Omitted intentionally as it was not required by the spec.
- **Lazy expiry as primary mechanism** — Simple, reliable, zero infrastructure overhead.

### With more time I would
- Add WebSocket or Server-Sent Events so stock numbers update live across all open browser tabs
- Add proper user authentication and link reservations to user accounts
- Write load/concurrency tests using k6 or artillery to validate race-condition handling under real traffic
- Add structured logging (Pino) and distributed tracing (OpenTelemetry)
- Add rate limiting per IP on the reservation endpoint
