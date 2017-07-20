import { getFromNpmRegistry } from './getFromNpmRegistry'

export function getCurrentPackageVersion(packageName) {
  return getFromNpmRegistry(packageName).then(registryDetails => {
    return (
      (registryDetails &&
        registryDetails['dist-tags'] &&
        registryDetails['dist-tags'].latest) ||
      null
    )
  })
}
