import { join } from 'path'
import fs from 'fs'

export function getRelatedPackages(config) {
  function getRelatedPackages(name) {
    return new Promise((resolve, reject) => {
      try {
        const info = JSON.parse(
          fs
            .readFileSync(join(config.packagesPaths[name], 'package.json'))
            .toString()
        )
        if (info.name !== name) {
          throw new Error(
            `Invalid package.json (name entry '${info.name}' does not match package name '${name}').`
          )
        }
        const relatedPackages = {
          dependencies: [],
          devDependencies: [],
          peerDependencies: [],
        }

        Object.keys(relatedPackages).forEach(group =>
          Object.keys(info[group] || {}).forEach(dependency => {
            if (dependency in config.packagesPaths) {
              relatedPackages[group].push(dependency)
            }
          })
        )

        resolve(relatedPackages)
      } catch (error) {
        reject(error)
      }
    })
  }

  return getRelatedPackages
}
