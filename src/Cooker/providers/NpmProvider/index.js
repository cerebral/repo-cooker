import { getCurrentPackageVersion } from './getCurrentPackageVersion'
import { publish } from './publish'
import { replaceTag } from './replaceTag'
import { runScript } from './runScript'

export function NpmProvider(config) {
  return context => {
    context.npm = {
      publish: publish(config),
      getCurrentPackageVersion,
      replaceTag: replaceTag(config),
      runScript: runScript(config),
    }
    return context
  }
}
