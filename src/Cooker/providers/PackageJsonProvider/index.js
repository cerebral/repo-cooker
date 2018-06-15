import { Provider } from 'function-tree'
import { write } from './write'
import { getDependencies } from './getDependencies'
import { getRelatedPackages } from './getRelatedPackages'
import { get } from './get'

export function PackageJsonProvider(config) {
  return new Provider({
    get: get(config),
    getDependencies: getDependencies(config),
    getRelatedPackages: getRelatedPackages(config),
    write: write(config),
  })
}
export default PackageJsonProvider
