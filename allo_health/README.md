# Allo Inventory

Multi-warehouse inventory reservation platform built with Next.js 14 (App Router), Prisma, PostgreSQL, and Zod.

## Local Setup

```bash
npm install
cp .env.example .env.local
# Fill in DATABASE_URL (Supabase / Neon / Railway free tier all work)
# Fill in CRON_SECRET (any random string, e.g. openssl rand -hex 16)
npx prisma db push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `CRON_SECRET` | Secret header value for the cron endpoint (optional locally) |

---

## How expiry works in production

Reservations expire 10 minutes after creation. Two mechanisms release them:

**1. Lazy cleanup (always on)**
Every `GET /api/products` call runs `releaseExpiredReservations()` before returning data. This means stock is reclaimed whenever the product listing is loaded — no separate infrastructure required.

**2. Vercel Cron (every 5 minutes)**
`vercel.json` schedules `GET /api/cron/release-expired` every 5 minutes. The endpoint is protected by the `x-cron-secret` header matching `CRON_SECRET`. This ensures expiry runs even when no users are browsing the product page (e.g. overnight).

Both mechanisms call the same `releaseExpiredReservations()` function and are safe to run concurrently — each update is wrapped in a transaction.

---

## Concurrency: how exactly-one-winner is guaranteed

When two requests simultaneously try to reserve the last unit of a SKU, the reservation endpoint uses a **PostgreSQL Serializable transaction**:

1. Both transactions read `stock.reserved` — they both see enough stock.
2. Both attempt to increment `stock.reserved`.
3. Postgres detects the write–write conflict and aborts one transaction with error code `P2034` (serialization failure).
4. The API catches `P2034` specifically and returns **409** to the losing caller. The winning caller gets **201**.

This guarantees exactly one reservation for the last unit without any application-level locking.

**Why not Redis Redlock?**
A distributed lock (Redlock via Upstash) would add latency and a second point of failure without improving correctness when all writes go to a single Postgres primary. It becomes relevant in a multi-region active-active setup where the database itself is replicated. That case is noted in `src/lib/redis.ts` for future reference.

---

## Idempotency

`POST /api/reservations` and `POST /api/reservations/:id/confirm` both support the `Idempotency-Key` header:

- On first request the response is stored in the `IdempotencyKey` table.
- On any retry with the same key the stored response is returned immediately — no side effects repeat.
- Keys are scoped per endpoint so the same UUID can be used for reserve and confirm independently.

The frontend generates idempotency keys as `reserve-{productId}-{timestamp}` and `confirm-{id}-{timestamp}`. In a real payment flow these would be stable UUIDs generated once per checkout session and retried on network failure.

---

## Trade-offs and things I'd do differently

**Serializable vs advisory locks**
Serializable transactions are simple and correct but can cause more transaction retries under high contention. `SELECT ... FOR UPDATE` on the stock row would be more targeted and predictable under load, at the cost of slightly more verbose code.

**Lazy expiry is best-effort**
If no one visits the product page for 30 minutes, expired reservations sit in the DB unreleased until the next cron tick or page load. For a production system the cron cadence could be shortened to 1 minute, or expiry could be pushed to a background worker (BullMQ, pg-boss) for sub-minute precision.

**No optimistic UI**
After clicking Reserve the UI waits for the server round-trip before navigating. An optimistic update (navigate immediately, roll back on 409) would feel faster but complicates error handling.

**Idempotency key expiry**
`IdempotencyKey` rows are never deleted. In production they should be pruned after 24–48 hours (a scheduled job or a Postgres TTL via `pg_cron`).

**No authentication**
Reservations are not tied to a user identity. In production each reservation would carry a `userId` and the confirm/release endpoints would verify ownership.

**shadcn/ui**
The UI uses raw inline styles for speed. Migrating to shadcn/ui components would improve consistency and accessibility with minimal effort.
