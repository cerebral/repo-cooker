import { writeVersion } from './writeVersion'

export function PackageJsonProvider(config) {
  return context => {
    context.packageJson = {
      writeVersion: writeVersion(config),
    }
    return context
  }
}
