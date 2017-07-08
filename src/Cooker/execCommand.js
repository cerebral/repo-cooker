import { spawn } from 'child_process'
import { writeFile } from 'fs'

function findName(cmd) {
  if (typeof cmd === 'string') {
    return cmd
  } else if (cmd.name) {
    return cmd.name
  } else if (cmd === writeFile) {
    return 'fs.writeFile'
  } else {
    return 'native'
  }
}

export function serializeCommand(cmd, args, options) {
  const argsPreview = args
    .map(arg => (typeof arg === 'string' ? arg : (typeof arg === 'function' ? '()' : JSON.stringify(arg))))
    .map(arg => (arg.length > 30 ? '...' + arg.slice(-30) : arg))
    .join(' ')
  return `[${findName(cmd)}] ${argsPreview}${options ? ' ' + JSON.stringify(options) : ''}`
}

export function logCommand(cmd, args, options) {
  console.log(serializeCommand(cmd, args, options))
  return Promise.resolve([])
}

export function runCommand(cmd, args = [], options) {
  if (typeof cmd === 'function') {
    if (options) {
      throw new Error(
        `'options' parameter not supported when running a function.`
      )
    } else if (!Array.isArray(args)) {
      throw new Error(`Please provide function arguments as an Array.`)
    }
    return cmd(...args)
  }
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, options || {})
    let out = []
    let err = []
    child.stdout.on('data', data => out.push(data))
    child.stderr.on('data', data => err.push(data))
    child.on('close', function(code) {
      if (code === 0) {
        resolve(out)
      } else {
        reject(err)
      }
    })
  })
}
