#!/usr/bin/env node
import { spawn } from 'child_process'

const next = spawn("npx", ["next-remote-watch"])

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
