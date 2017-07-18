import { write } from './write'
import { getRelatedPackages } from './getRelatedPackages'

export function PackageJsonProvider(config) {
  return context => {
    context.packageJson = {
      write: write(config),
      getRelatedPackages: getRelatedPackages(config),
    }
    return context
  }
}
