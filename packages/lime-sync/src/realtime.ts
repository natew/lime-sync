/**
 * Streaming fields: an ephemeral typed value beside the durable Zero row.
 *
 * The implementation lives in lime-sync-executor because two packages need it
 * and only one of them can be the owner. lime-sync depends on sync-cf-host (for
 * `lime-sync/cloudflare/sync`) and sync-cf-host's Durable Object hosts the hub,
 * so owning it here would make lime-sync and sync-cf-host import each other:
 * a fresh checkout could not build, and the release ordering, which is
 * topological over workspace dependencies, would refuse the cycle outright.
 *
 * sync-executor sits below both and has no workspace dependencies of its own,
 * so it is the one place both can reach. This re-export keeps
 * `lime-sync/realtime` working unchanged for everything already importing it.
 *
 * See docs/streaming-fields.md.
 */
export * from 'lime-sync-executor/realtime'
