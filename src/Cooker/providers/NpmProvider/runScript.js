import { readFile } from 'fs'
import { join } from 'path'

function hasScript(packagePath, scriptName) {
  return new Promise((resolve, reject) => {
    readFile(packagePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const info = JSON.parse(data).scripts || {}
        resolve(!!info[scriptName])
      }
    })
  })
}

export function runScript(config) {
  const { runCommand, packagesPaths } = config

  return function runScript(packageName, scriptName, args = []) {
    const cwd = packagesPaths[packageName]
    return hasScript(join(cwd, 'package.json'), scriptName).then(
      exists =>
        exists
          ? runCommand('npm', ['run', scriptName, ...args], {
              cwd,
            })
          : false
    )
  }
}
