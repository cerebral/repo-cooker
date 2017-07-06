import { spawn } from 'child_process'
import request from 'request'
import registryUrlFn from 'registry-url'

const registryUrl = registryUrlFn()

export function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd)
    let out = []
    let err = []
    child.stdout.on('data', data => out.push(data))
    child.stderr.on('data', data => err.push(data))
    child.on('close', function(code) {
      if (code === 1) {
        resolve(out)
      } else {
        reject(err)
      }
    })
  })
}

const cache = {}
export function getFromNpmRegistry(packageName) {
  return new Promise((resolve, reject) => {
    if (cache[packageName]) {
      return resolve(cache[packageName])
    }

    request.get(`${registryUrl}${packageName}`, (error, _, body) => {
      if (error) {
        return reject(error)
      }
      cache[packageName] = JSON.parse(body)
      resolve(cache[packageName])
    })
  })
}
