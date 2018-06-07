import { readFile } from 'fs'
import { join } from 'path'

export function getPackageInfo(name, path) {
  return new Promise((resolve, reject) =>
    readFile(join(path, 'package.json'), 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      try {
        const info = JSON.parse(data)
        if (info.name !== name) {
          reject(
            new Error(
              `Invalid package.json (name entry '${
                info.name
              }' does not match package name '${name}').`
            )
          )
        } else {
          resolve(info)
        }
      } catch (err) {
        reject(err)
      }
    })
  )
}
