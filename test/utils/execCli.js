import { config } from './'
import { spawn } from 'cross-spawn'

export function execCli(cmd, args = []) {
  const cwd = config.path
  return new Promise((resolve, _reject) => {
    const child = spawn(cmd, args, { cwd })
    const out = []
    child.stdout.setEncoding('utf-8')
    child.stderr.setEncoding('utf-8')
    child.stdout.on('data', (data) => {
      out.push(data)
    })
    child.stderr.on('data', (data) => {
      out.push(data)
    })
    child.on('close', function (code) {
      resolve({ code, output: out.join('\n') })
    })
  })
}
