import { Provider } from 'function-tree'
import { getCurrentPackageVersion } from './getCurrentPackageVersion'
import { publish } from './publish'
import { validateVersion } from './validateVersion'

export function VSCodeProvider(config) {
  return new Provider({
    validateVersion,
    publish: publish(config),
    getCurrentPackageVersion,
  })
}
export default VSCodeProvider
