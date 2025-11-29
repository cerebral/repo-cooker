import { getFromNpmRegistry } from './getFromNpmRegistry'

// Initial temporary releases (beta, next) automatically set `latest` on npm registry
// and we must not use these temporary releases as base to compute semver.
const SEMVER_RE = /^\d+\.\d+\.\d+$/
export function getCurrentPackageVersion(packageName) {
  return getFromNpmRegistry(packageName).then((registryDetails) => {
    const version =
      (registryDetails &&
        registryDetails['dist-tags'] &&
        registryDetails['dist-tags'].latest) ||
      null
    return version && SEMVER_RE.test(version) ? version : null
  })
}
