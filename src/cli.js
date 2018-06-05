#!/usr/bin/env node
// repo-cooker [cmd] [props] --dry-run --devtools
// 1. Looks for [cmd] in
//    './[repo-cooker path]/cmd.js'
//    './[repo-cooker path]/cmd/index.js'
//    The `[repo-cooker path]` can be defined in package.json
//    with 'repo-cooker-path' or is set to the default './repo-cooker'
// 2. If [cmd] is not found, uses the builtin
//    `run` command to run the given [cmd] in all packages
//    that contain the given script.
import { spawn } from 'child_process'
import { readFileSync, statSync } from 'fs'
import { join, resolve } from 'path'

import { parseArgs } from './helpers/parseArgs'

const rootPath = '.'

function fileExist(path) {
  try {
    const stats = statSync(path)
    return stats.isFile()
  } catch (err) {
    return false
  }
  return false
}

const packagePath = join(rootPath, 'package.json')
const packageInfo = JSON.parse(readFileSync(packagePath, { encoding: 'utf8' }))
const receiptsPath = packageInfo['repo-cooker-path'] || 'repo-cooker'

const { cmd, args } = parseArgs(process.argv)

if (!cmd) {
  throw new Error(`Invalid call to repo-cooker binary: missing command to run.`)
}

const cmdPath = [
  join(receiptsPath, `${cmd}.js`),
  join(receiptsPath, `${cmd}/index.js`),
].find(fileExist)

let fullCmdPath = undefined
if (cmdPath) {
  // Found a custom script for this command.
  fullCmdPath = resolve(cmdPath)
  console.log(`Running script: ${fullCmdPath}`)
} else {
  // Run the npm script
  fullCmdPath = resolve(join(receiptsPath, 'index.js'))
  if (!fileExist(fullCmdPath)) {
    throw new Error(`Missing repo-cooker base file at '${fullCmdPath}'.`)
  }
  args.unshift(cmd)
  args.unshift('--run')
}
console.log(`> babel-node --presets env ${fullCmdPath} ${args.join(' ')}`)
const child = spawn('babel-node', ['--presets', 'env', fullCmdPath, ...args], {
  stdio: 'inherit',
})
child.on('close', function(code) {
  exit(code)
})
