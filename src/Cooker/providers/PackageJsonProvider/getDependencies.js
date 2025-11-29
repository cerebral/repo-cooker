import { getPackageInfo } from './helpers'

export function getDependencies(config) {
  return function getDependencies(name) {
    return getPackageInfo(name, config.packagesPaths[name]).then((info) => ({
      dependencies: info.dependencies || {},
      devDependencies: info.devDependencies || {},
      peerDependencies: info.peerDependencies || {},
    }))
  }
}
