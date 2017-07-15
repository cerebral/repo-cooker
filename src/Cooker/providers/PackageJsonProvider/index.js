import { writeVersion } from './writeVersion'
import { getPackageVersion } from './getPackageVersion'

export function PackageJsonProvider(config) {
  return context => {
    context.packageJson = {
      writeVersion: writeVersion(config),
      getPackageVersion: getPackageVersion(config),
    }
    return context
  }
}
