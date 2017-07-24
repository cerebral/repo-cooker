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
        const dependencies = Object.assign(
          {},
          info.peerDependencies || {},
          info.devDependencies || {},
          info.dependencies || {}
        )
        if (info.name !== name) {
          throw new Error(
            `Invalid package.json (name entry '${info.name}' does not match package name '${name}').`
          )
        }

        resolve(
          Object.keys(dependencies).reduce((relatedPackages, dependency) => {
            if (dependency in config.packagesPaths) {
              return relatedPackages.concat(dependency)
            }

            return relatedPackages
          }, [])
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  return getRelatedPackages
}
