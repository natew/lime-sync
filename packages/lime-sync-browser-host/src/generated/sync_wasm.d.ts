/* tslint:disable */
/* eslint-disable */

/**
 * Apply one ordered catch-up page to staging without touching the live table
 * namespace or live upstream watermark.
 */
export function engine_apply_snapshot_changes(db: any, schema: any, generation: string, batch: any): any;

/**
 * Apply one bounded source page to staging and commit its opaque cursor with
 * the rows. The host owns one transaction per call.
 */
export function engine_apply_snapshot_page(db: any, schema: any, generation: string, table: string, rows: any, next_cursor?: string | null): any;

/**
 * Apply one ordered page from the upstream ZeroSqlDO change feed. The host
 * owns one transaction around this call; application triggers append the
 * ordinary engine change-log entries consumed by pull/CVR code.
 */
export function engine_apply_upstream(db: any, schema: any, batch: any): any;

/**
 * Atomically rebuild application rows from a point-in-time upstream snapshot.
 */
export function engine_apply_upstream_snapshot(db: any, schema: any, snapshot: any): any;

export function engine_assemble_push_response(results: any): any;

/**
 * Authorize a realtime field subscription.
 *
 * Answers the one question a host needs before it will stream a row's field to
 * a client: does this client group's own durable query membership already
 * deliver that row, and does the group belong to the authenticated user?
 *
 * A negative answer is not always a denial. `authorized: false` with
 * `ownsGroup: true` is the optimistic-row race, where the client legitimately
 * holds a row from its own mutation that the server has not recorded
 * membership for yet; the host answers that subscription pending and the
 * client retries after its next pull. `ownsGroup: false` is a real denial.
 */
export function engine_authorize_realtime_subscription(db: any, schema: any, client_group_id: string, user_id: string, table: string, pk: any): any;

/**
 * Create a new staged generation. `start_watermark` is captured by the host
 * from the first source snapshot-page response. The host owns the transaction.
 */
export function engine_begin_snapshot_generation(db: any, schema: any, start_watermark: string): any;

/**
 * Compile a validated Zero query AST for a consumer mutator's transactional
 * `tx.run(...)`. Execution remains in the host-owned application transaction.
 */
export function engine_compile_query(schema: any, ast: any, format: any): any;

export function engine_finalize(db: any, client_group_id: string, client_id: string, mutation_id: string): void;

/**
 * Atomically rename a drained staged generation into the live namespace,
 * invalidate pre-cutover client cookies, and advance the live source cursor.
 */
export function engine_finalize_snapshot_generation(db: any, schema: any, generation: string, watermark: string): any;

/**
 * Production pull entry point. Desired-query ASTs are already resolved and
 * validated by the consumer host before crossing this boundary.
 */
export function engine_handle_query_pull(db: any, schema: any, retain_changes: string, body: any, user_id: string): any;

/**
 * Initialize the additive query-aware durable tables. The host owns the
 * transaction boundary, exactly as it does for the baseline schema.
 */
export function engine_init_query_schema(db: any): void;

/**
 * Initialize the sync engine's durable metadata and triggers. The host calls
 * this inside startup `transactionSync` after application DDL and seed.
 */
export function engine_init_schema(db: any, schema: any): void;

export function engine_invalidate(db: any): void;

/**
 * Linear-memory size for authenticated operator soak diagnostics. This is a
 * byte count only; it contains no application or query data.
 */
export function engine_memory_bytes(): number;

export function engine_preflight(db: any, client_group_id: string, client_id: string, mutation_id: string, user_id: string): any;

export function engine_prune(db: any, retain_changes: string): void;

/**
 * Validate an entire push before the host opens the first mutation tx.
 */
export function engine_push_validate(body: any): any;

/**
 * Strictly read resumable snapshot progress. Storage and row-shape failures
 * are errors; only a successful query with no active row returns null.
 */
export function engine_read_snapshot_progress(db: any): any;

export function engine_record_app_error(db: any, client_group_id: string, client_id: string, mutation_id: string, user_id: string): void;

/**
 * Identity of the durable DDL this engine build installs. Hosts fold it into
 * the fingerprint that lets an up-to-date namespace skip the schema pass.
 */
export function engine_schema_revision(): string;

export function engine_state(db: any): any;

export function engine_version(): string;

/**
 * The clients a wake after an ingest should reach: every client whose group
 * can see a row committed after `since`. `{ all: true }` means wake every
 * socket; otherwise `clientIDs` lists the clients to wake. Call it with a
 * transaction open, after the ingest that advanced past `since`.
 */
export function engine_wake_targets(db: any, schema: any, since: string): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly engine_apply_snapshot_changes: (a: any, b: any, c: number, d: number, e: any) => [number, number, number];
    readonly engine_apply_snapshot_page: (a: any, b: any, c: number, d: number, e: number, f: number, g: any, h: number, i: number) => [number, number, number];
    readonly engine_apply_upstream: (a: any, b: any, c: any) => [number, number, number];
    readonly engine_apply_upstream_snapshot: (a: any, b: any, c: any) => [number, number, number];
    readonly engine_assemble_push_response: (a: any) => [number, number, number];
    readonly engine_authorize_realtime_subscription: (a: any, b: any, c: number, d: number, e: number, f: number, g: number, h: number, i: any) => [number, number, number];
    readonly engine_begin_snapshot_generation: (a: any, b: any, c: number, d: number) => [number, number, number];
    readonly engine_compile_query: (a: any, b: any, c: any) => [number, number, number];
    readonly engine_finalize: (a: any, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly engine_finalize_snapshot_generation: (a: any, b: any, c: number, d: number, e: number, f: number) => [number, number, number];
    readonly engine_handle_query_pull: (a: any, b: any, c: number, d: number, e: any, f: number, g: number) => [number, number, number];
    readonly engine_init_query_schema: (a: any) => [number, number];
    readonly engine_init_schema: (a: any, b: any) => [number, number];
    readonly engine_invalidate: (a: any) => [number, number];
    readonly engine_memory_bytes: () => [number, number, number];
    readonly engine_preflight: (a: any, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number];
    readonly engine_prune: (a: any, b: number, c: number) => [number, number];
    readonly engine_push_validate: (a: any) => [number, number, number];
    readonly engine_read_snapshot_progress: (a: any) => [number, number, number];
    readonly engine_record_app_error: (a: any, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly engine_schema_revision: () => [number, number];
    readonly engine_state: (a: any) => [number, number, number];
    readonly engine_version: () => [number, number];
    readonly engine_wake_targets: (a: any, b: any, c: number, d: number) => [number, number, number];
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
