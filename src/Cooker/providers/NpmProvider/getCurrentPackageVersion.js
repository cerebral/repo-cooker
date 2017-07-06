import { getFromNpmRegistry } from './utils'

export function getCurrentPackageVersion(packageName) {
  return getFromNpmRegistry(packageName)
    .then(registryDetails => registryDetails['dist-tags'])
    .then(tags => (tags ? tags.latest : undefined))
}
