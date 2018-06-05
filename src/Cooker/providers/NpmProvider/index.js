import { Provider } from 'function-tree'
import { getCurrentPackageVersion } from './getCurrentPackageVersion'
import { publish } from './publish'
import { replaceTag } from './replaceTag'
import { runScript } from './runScript'

export function NpmProvider(config) {
  return new Provider({
    publish: publish(config),
    getCurrentPackageVersion,
    replaceTag: replaceTag(config),
    runScript: runScript(config),
  })
}
export default NpmProvider
