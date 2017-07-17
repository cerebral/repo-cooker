import { writeVersion } from './writeVersion'
import { getRelatedPackages } from './getRelatedPackages'

export function PackageJsonProvider(config) {
  return context => {
    context.packageJson = {
      writeVersion: writeVersion(config),
      getRelatedPackages: getRelatedPackages(config),
    }
    return context
  }
}
