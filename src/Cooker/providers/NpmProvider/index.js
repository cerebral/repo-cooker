import { getCurrentPackageVersion } from './getCurrentPackageVersion'
import { publish } from './publish'
import { replaceTag } from './replaceTag'

export function NpmProvider(config) {
  return context => {
    context.npm = {
      publish: publish(config),
      getCurrentPackageVersion,
      replaceTag: replaceTag(config),
    }
    return context
  }
}
