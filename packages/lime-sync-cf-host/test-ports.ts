import { createServer, type Server } from 'node:net'

// find one free loopback port for a workerd test worker to bind. mirrors the
// port helper in natew/orez src/port.ts; kept here so this package tests from
// this repo alone.
export async function findPort(preferred: number, maxAttempts = 20): Promise<number> {
  let port = preferred
  let attempt = 0

  while (true) {
    const server = await tryListen(port)
    if (server) {
      const address = server.address()
      const bound = typeof address === 'object' && address ? address.port : port
      await new Promise<void>((resolve) => server.close(() => resolve()))
      return bound
    }
    if (attempt >= maxAttempts) break
    attempt++
    port = preferred === 0 ? 0 : port + 1
  }

  throw new Error(`could not find a free port from ${preferred}`)
}

function tryListen(port: number): Promise<Server | null> {
  return new Promise((resolve) => {
    const server = createServer()
    server.unref()
    const onError = () => resolve(null)
    server.once('error', onError)
    server.listen(port, '127.0.0.1', () => {
      server.off('error', onError)
      resolve(server)
    })
  })
}
