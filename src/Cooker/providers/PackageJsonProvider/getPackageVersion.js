import { join } from 'path'
import fs from 'fs'

export function getPackageVersion(config) {
  function getPackageVersion(name) {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          JSON.parse(
            fs
              .readFileSync(join(config.packagesPaths[name], 'package.json'))
              .toString()
          ).version
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  return getPackageVersion
}
