import { join } from 'path'
import { readFile, writeFile as fsWriteFile } from 'fs'

const options = { encoding: 'utf8' }

function getContent(path) {
  return new Promise((resolve, reject) => {
    readFile(path, options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function writeFile(path, data, options) {
  return new Promise((resolve, reject) => {
    fsWriteFile(
      path,
      data,
      options || {},
      err => (err ? reject(err) : resolve())
    )
  })
}

export function write({ runCommand, packagesPaths }) {
  return function write(packageName, newContentCb) {
    const path = join(packagesPaths[packageName], 'package.json')

    return getContent(path)
      .then(content => Object.assign({}, content, newContentCb(content)))
      .then(newContent =>
        runCommand(writeFile, [
          path,
          JSON.stringify(newContent, null, 2),
          options,
        ])
      )
  }
}
