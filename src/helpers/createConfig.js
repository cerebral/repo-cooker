import { execCommand, logCommand } from './execCommand'
import { getPackagesPaths } from './getPackagesPaths'

export function createConfig(options) {
  // Create possible packages paths
  const packagesPaths = getPackagesPaths(options.path, options.packagesGlobs)
  const runCommand =
    options.dryRun === true
      ? logCommand
      : typeof options.dryRun === 'function'
        ? options.dryRun
        : execCommand

  return Object.assign({}, options, { packagesPaths, runCommand })
}
