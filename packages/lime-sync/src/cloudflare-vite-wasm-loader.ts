import { orezSyncCfHostWasm as syncCfHostWasm } from '@o/lime-sync-cf-host/vite-wasm-loader'

type OrezSyncCfHostWasmOptions = {
  runtime?: 'node' | 'workerd'
}

/** load Orez Lite and its sync engine into Vite's SSR bundle. */
export function orezSyncCfHostWasm(options: OrezSyncCfHostWasmOptions = {}) {
  return syncCfHostWasm({ noExternal: ['@o/lime-sync'], runtime: options.runtime })
}
