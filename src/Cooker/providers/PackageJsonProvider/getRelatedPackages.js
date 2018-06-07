import { getPackageInfo } from './helpers'

export function getRelatedPackages(config) {
  function getRelatedPackages(name) {
    return getPackageInfo(name, config.packagesPaths[name]).then(info => {
      const dependencies = Object.assign(
        {},
        info.peerDependencies || {},
        info.devDependencies || {},
        info.dependencies || {}
      )

      return Object.keys(dependencies).reduce((relatedPackages, dependency) => {
        if (dependency in config.packagesPaths) {
          return relatedPackages.concat(dependency)
        }

        return relatedPackages
      }, [])
    })
  }

  return getRelatedPackages
}
