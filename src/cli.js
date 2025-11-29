#!/usr/bin/env node

import { join, resolve } from './helpers/path'
import { readFileSync, statSync } from 'fs'

import { parseArgs } from './helpers/parseArgs'
// repo-cooker [cmd] [props] --dry-run --devtools
// 1. Looks for [cmd] in
//    './[repo-cooker path]/cmd.js'
//    './[repo-cooker path]/cmd/index.js'
//    The `[repo-cooker path]` can be defined in package.json
//    with 'repo-cooker-path' or is set to the default './repo-cooker'
// 2. If [cmd] is not found, uses the builtin
//    `run` command to run the given [cmd] in all packages
//    that contain the given script.
import { spawn } from 'cross-spawn'

const rootPath = '.'

function fileExist(path) {
  try {
    const stats = statSync(path)
    return stats.isFile()
  } catch (_err) {
    return false
  }
}

const packagePath = join(rootPath, 'package.json')
const packageInfo = JSON.parse(readFileSync(packagePath, { encoding: 'utf8' }))
const receiptsPath = packageInfo['repo-cooker-path'] || 'repo-cooker'

const { cmd, args, builtin } = parseArgs(process.argv)
let cmdPath
if (cmd) {
  cmdPath = [
    join(receiptsPath, `${cmd}.js`),
    join(receiptsPath, `${cmd}/index.js`),
  ].find(fileExist)
}

let fullCmdPath
if (cmdPath) {
  // Found a custom script for this command.
  fullCmdPath = resolve(cmdPath)
  console.log(`Running script: ${fullCmdPath}`)
} else {
  // Run a native signal. Just load the configuration.
  fullCmdPath = (
    receiptsPath.slice(-3) === '.js'
      ? [resolve(receiptsPath)]
      : [resolve(`${receiptsPath}.js`), resolve(join(receiptsPath, 'index.js'))]
  ).find(fileExist)

  if (!fullCmdPath) {
    throw new Error(`Missing repo-cooker setup file at '${receiptsPath}'.`)
  }
  if (cmd) {
    args.unshift(cmd)
  }
  if (!builtin) {
    args.unshift('--builtin=run')
  }
}

console.log(
  `> babel-node --presets @babel/preset-env ${fullCmdPath} ${args.join(' ')}`
)
const child = spawn(
  'babel-node',
  ['--presets', '@babel/preset-env', fullCmdPath, ...args],
  {
    stdio: 'inherit',
  }
)
child.on('close', function (code) {
  process.exit(code)
})
