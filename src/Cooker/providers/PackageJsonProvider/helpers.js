import { readFile } from 'fs'
import { join } from 'path'

const packageInfoCache = {}

export function getPackageInfo(name, path) {
  const packagePath = join(path, 'package.json')
  const cache = packageInfoCache[packagePath]
  if (cache) {
    return Promise.resolve(JSON.parse(cache))
  }
  return new Promise((resolve, reject) =>
    readFile(packagePath, 'utf8', (err, data) => {
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
          packageInfoCache[packagePath] = data
          resolve(info)
        }
      } catch (err) {
        reject(err)
      }
    })
  )
}
