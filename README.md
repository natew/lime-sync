# Lime Sync

![Lime Sync](./lime-sync.svg)

A compact Rust and SQLite sync server for Zero's real client. It speaks the
Zero protocol to a stock `@rocicorp/zero` client and replaces zero-cache for
deployments that would rather not run Postgres and a long-lived cache process.
On Cloudflare it runs as one Durable Object per namespace, holding both the
sync engine and its SQLite storage in the same object.

Docs: https://lime-sync.natewienert.workers.dev

```sh
bun add @o/lime-sync
```

```ts
import { createClient } from '@o/lime-sync/client'
```

## Packages

| Package                           | npm                     | Purpose                                                           |
| --------------------------------- | ----------------------- | ----------------------------------------------------------------- |
| `packages/lime-sync`              | `@o/lime-sync`          | Public engine: client, browser, native, and Cloudflare surfaces   |
| `packages/lime-sync-executor`     | `@o/lime-sync-executor` | Host-neutral mutation execution and application adapters          |
| `packages/lime-sync-cf-host`      | `@o/lime-sync-cf-host`  | Cloudflare Durable Object host and query runtime                  |
| `packages/lime-sync-browser-host` | private                 | Browser worker host behind `@o/lime-sync/browser`                 |
| `packages/lime-sync-native`       | `@o/lime-sync-native`   | Prebuilt native host launcher plus per-platform packages          |
| `sqlite-wasm`                     | `bedrock-sqlite`        | WASM SQLite build with a better-sqlite3 compatible API            |
| `crates/sync-core`                | —                       | Rust engine core, shared by native, WASM, and Cloudflare hosts    |
| `harness`                         | private                 | Conformance, fault, and differential suites that prove the engine |

`docs/sync` holds the architecture, configuration, testing, and operations
guides. Cloudflare billing is a first-class constraint here: every change on a
Durable Object path is costed before it is judged correct, and the write
budgets are pinned by tests, not comments. See `docs/sync/trade-offs.md`.

## Develop

```sh
bun install
bun run check
bun run test
```

`bun run check` runs the workspace cycle guard, every TypeScript typecheck, and
the engine builds including the Rust-to-WASM hosts. `bun run test` runs the
unit suites, the executor suite, and the release tooling tests. The heavier
conformance lanes (harness, browser host, native faults, Cloudflare workerd)
run in CI.

## Releases

Every push to `main` publishes a canary after CI passes; stable releases stay
explicit (`bun release --patch --ci`). See `docs/releasing.md`. The npm trusted
publisher for each public package points at this repository's `release.yml`.

## Evidence

`data/lime-sync-evidence.json` records the exact-SHA build ledger: which
commit the qualified fault traces, conformance lanes, and mutation gates ran
against. CI regenerates it after every required job passes. Never hand-edit it;
run `bun scripts/generate-lime-sync-evidence.ts generate`.

## License

MIT. See `LICENSE`.
