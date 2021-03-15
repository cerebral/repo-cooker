import { spawn } from 'cross-spawn'
import { writeFile } from 'fs'

const PAUSE_MS = 8000

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

function isStringified(string) {
  return Boolean(
    typeof string === 'string' && string.match(/(\{|\[)[\s\S]*(\}|\])$/)
  )
}

export function readableCommand(cmd, args, options) {
  return {
    cmd: findName(cmd),
    args: args
      .map(arg => (typeof arg === 'function' ? '()' : arg))
      .map(arg => (isStringified(arg) ? '[data]' : arg)),
    options,
  }
}

function limit(text) {
  const str = text.split('\n').join('\\n')
  return str.length > 50 ? '...' + str.slice(-47) : str
}

export function logCommand(cmd, args, options) {
  const command = readableCommand(cmd, args, options)
  console.log(
    `\n\x1b[33m${command.cmd}\x1b[0m\n    ${command.args
      .map(arg => (typeof arg === 'string' ? limit(arg) : JSON.stringify(arg)))
      .join('\n    ')}${options ? '\n    ' + JSON.stringify(options) : ''}`
  )
  return Promise.resolve([])
}

const FAIL = '\x1b[31m    FAIL\x1b[0m'
const PASS = '\x1b[32m    OK\x1b[0m'

export function execCommand(cmd, args = [], options) {
  if (typeof cmd === 'function') {
    if (options) {
      throw new Error(
        `'options' parameter not supported when running a function.`
      )
    } else if (!Array.isArray(args)) {
      throw new Error(`Please provide function arguments as an Array.`)
    }
    return new Promise((resolve, reject) => {
      cmd(...args)
        .then(x => {
          logCommand(cmd, args, options)
          console.log(PASS)
          resolve(x)
        })
        .catch(err => {
          logCommand(cmd, args, options)
          console.log(FAIL)
          reject(err)
        })
    })
  }
  const opts = Object.assign({}, options || {})
  const pause = opts.pause
  delete opts.pause
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, opts)
    let out = []
    child.stdout.setEncoding('utf-8')
    child.stderr.setEncoding('utf-8')
    child.stdout.on('data', data => {
      out.push(data)
    })
    child.stderr.on('data', data => {
      out.push(data)
    })
    child.on('close', function(code) {
      if (code === 0) {
        logCommand(cmd, args, options)
        console.log(PASS)
        console.log(out.join('\n'))
        if (pause) {
          setTimeout(() => {
            resolve(out.join('\n'))
          }, PAUSE_MS)
        } else {
          resolve(out.join('\n'))
        }
      } else {
        logCommand(cmd, args, options)
        console.log(FAIL)
        console.log(out.join('\n'))
        reject(out.join('\n'))
      }
    })
  })
}
