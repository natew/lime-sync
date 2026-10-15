# lime-sync agent contract

USE CONVENTIONAL COMMITS. Work on `main`.

Lint and format are SEPARATE CI gates. `bun run lint` (oxlint) passing does not
mean `bun run format:check` (oxfmt) passes, and CI runs both. Run
`bun run format:check` before pushing. Pinned tool versions in the root
`package.json` must match `natew/orez` so both repos share one style.

Every push to `main` publishes a canary after CI passes; no approval needed.
Stable releases (`bun release --patch --ci`) need explicit approval. Canaries
build and publish without test gates. State the validation actually run in
each commit message body, or `Validation: none`.

Worktrees go under `~/.worktrees/lime-sync-<slug>`, never in `/tmp` or inside
the repo.

## Cloudflare reads and writes are a billing contract

Treat every added read and write on a Durable Object path as a cost decision
before it is a correctness decision. Full detail lives in
`docs/sync/trade-offs.md` — read it before changing anything on a DO write
path. Pin the cost in a test, not a comment
(`crates/sync-core/tests/pull_write_cost.rs` is the pattern).

## Canonical imports

Implementation may live in sub-packages, but consumers always import through
the parent: `lime-sync/realtime`, never `lime-sync-executor/realtime`. Direct
sub-package imports are allowed only inside this repo where going through the
parent would create a cycle.

## Public cleanliness

This repository is public and kept simple. No plans, run output, forensics, or
scratch files: `harness/results`, `perf/reports`, `target`, and `dist` stay
uncommitted. The one exception is generated code a fresh checkout needs
(`packages/lime-sync-browser-host/src/generated`, `sqlite-wasm/dist`), which
is force-added like upstream.
