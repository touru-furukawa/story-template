#!/usr/bin/env node
import { spawn } from 'child_process'

console.log("momo")

import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const nextRootDir = path.join(__dirname, "next-app")
console.log(nextRootDir)

const watcherPath = path.join(__dirname, "node_modules", "next-remote-watch", "bin", "next-remote-watch")

const next = spawn(watcherPath, ["-r", nextRootDir])

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
