import { Provider } from 'function-tree'
import { write } from './write'
import { getRelatedPackages } from './getRelatedPackages'

export function PackageJsonProvider(config) {
  return new Provider({
    write: write(config),
    getRelatedPackages: getRelatedPackages(config),
  })
}
export default PackageJsonProvider
