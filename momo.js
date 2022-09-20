#!/usr/bin/env node
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

// Resolve paths
const __filename = fileURLToPath(import.meta.url)
const packageRootPath = path.dirname(__filename)
const nextRootPath = path.join(packageRootPath, "next-app")
const watcherPath = path.join(packageRootPath,
  "node_modules", "next-remote-watch", "bin", "next-remote-watch")

// Start watching
const next = spawn(watcherPath, ["-r", nextRootPath])

// Configure standard output and error
next.stdout.on("data", data => {
  process.stdout.write(`${data}`)
})

next.stderr.on("data", data => {
  process.stderr.write(`${data}`)
})

next.on("error", error => {
  process.stderr.write(`${error.message}`)
})

next.on("close", code => {
  process.stderr.write(`exit: ${code}`)
})
