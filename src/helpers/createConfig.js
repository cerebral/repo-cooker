import { execCommand, logCommand } from './execCommand'
import { getPackagesPaths } from './getPackagesPaths'

export function createConfig(options) {
  if (!options.packagesGlobs) {
    throw new Error(
      'You have to pass in a set of packages globs on the "packagesGlobs" property'
    )
  }

  // Create possible packages paths
  const packagesPaths = getPackagesPaths(options.path, options.packagesGlobs)
  const runCommand =
    options.dryRun === true
      ? logCommand
      : typeof options.dryRun === 'function' ? options.dryRun : execCommand

  return Object.assign({}, options, { packagesPaths, runCommand })
}
