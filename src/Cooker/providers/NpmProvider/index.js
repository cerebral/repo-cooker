import { getFromNpmRegistry, runCommand } from './utils'

export function NpmProvider(config) {
  if (!config || !config.path) {
    throw new Error(`Invalid 'npm' configuration: missing path.`)
  }
  return context => {
    context.npm = {
      publish(options) {
        return runCommand(
          `cd ${config.path} && npm publish --tag ${options.tag}`
        )
      },
      getCurrentPackageVersions(packageName) {
        return getFromNpmRegistry(packageName).then(
          registryDetails => registryDetails['dist-tags']
        )
      },
      replaceTag(fromTag, toTag) {
        const packageName = config.path.split('/').pop()

        return runCommand(
          `cd ${config.path} && npm dist-tag add ${packageName} ${toTag} && npm dist-tag rm ${packageName} ${fromTag}`
        )
      },
    }
    return context
  }
}
