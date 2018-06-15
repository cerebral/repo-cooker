import { getPackageInfo } from './helpers'

export function get(config) {
  return function get(name) {
    return getPackageInfo(name, config.packagesPaths[name])
  }
}
