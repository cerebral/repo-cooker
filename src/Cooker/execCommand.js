import { spawn } from 'child_process'

export function logCommand(cmd, args, options) {
  console.log(`[${cmd}] ${JSON.stringify(args)} ${JSON.stringify(options)}`)
  return Promise.resolve([])
}

export function runCommand(cmd, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, options)
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
