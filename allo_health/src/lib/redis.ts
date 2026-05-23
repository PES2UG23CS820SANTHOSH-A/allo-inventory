// Redis / distributed locking is intentionally not wired in this deployment.
//
// Correctness under concurrency is guaranteed entirely by the PostgreSQL
// Serializable transaction in the reserve endpoint: when two requests race
// for the last unit, Postgres aborts one with a serialization failure (P2034)
// and the API returns 409 to the losing caller.
//
// A Redis-based distributed lock (e.g. Redlock via Upstash) would be a useful
// addition in a multi-region deployment where the DB itself is replicated, but
// it is redundant when a single Postgres primary handles all writes.
//
// Stubs are kept so the import in reservations/route.ts compiles cleanly
// while the actual locking is absent.
export async function acquireLock(
  _key: string,
  _ttlMs: number = 5000
): Promise<string | null> {
  return null;
}

export async function releaseLock(
  _key: string,
  _lockValue: string | null
): Promise<void> {
  return;
}
