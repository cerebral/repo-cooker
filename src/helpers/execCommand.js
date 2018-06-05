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

export function logCommand(cmd, args, options) {
  const command = readableCommand(cmd, args, options)
  console.log(
    `\n\x1b[33m${command.cmd}\x1b[0m\n    ${command.args
      .map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg)))
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
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, options || {})
    let out = []
    child.stdout.setEncoding('utf-8')
    child.stderr.setEncoding('utf-8')
    child.stdout.on('data', data => {
      console.log(data)
      out.push(data)
    })
    child.stderr.on('data', data => {
      console.log(data)
      out.push(data)
    })
    child.on('close', function(code) {
      console.log(`CLOSING '${cmd} ${args.join(' ')}'`)
      console.log(`code: ${code}`)
      if (code === 0) {
        logCommand(cmd, args, options)
        console.log(PASS)
        resolve(out.join('\n'))
      } else {
        logCommand(cmd, args, options)
        console.log(FAIL)
        reject(out.join('\n'))
      }
    })
  })
}
