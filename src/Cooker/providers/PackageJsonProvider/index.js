import { Provider } from 'function-tree'
import { write } from './write'
import { getDependencies } from './getDependencies'
import { getRelatedPackages } from './getRelatedPackages'

export function PackageJsonProvider(config) {
  return new Provider({
    write: write(config),
    getDependencies: getDependencies(config),
    getRelatedPackages: getRelatedPackages(config),
  })
}
export default PackageJsonProvider
