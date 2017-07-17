import { join } from 'path'
import fs from 'fs'

export function getRelatedPackages(config) {
  function getRelatedPackages(name) {
    return new Promise((resolve, reject) => {
      try {
        const dependencies =
          JSON.parse(
            fs
              .readFileSync(join(config.packagesPaths[name], 'package.json'))
              .toString()
          ).dependencies || {}

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
