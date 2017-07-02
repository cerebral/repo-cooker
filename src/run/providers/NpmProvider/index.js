import { getFromNpmRegistry, runCommand } from './utils'

export function NpmProvider(context) {
  context.npm = {
    publish(packagePath, options) {
      return runCommand(`cd ${packagePath} && npm publish --tag ${options.tag}`)
    },
    getCurrentPackageVersions(packageName) {
      return getFromNpmRegistry(packageName).then(
        registryDetails => registryDetails['dist-tags']
      )
    },
    replaceTag(packagePath, fromTag, toTag) {
      const packageName = packagePath.split('/').pop()

      return runCommand(
        `cd ${packagePath} && npm dist-tag add ${packageName} ${toTag} && npm dist-tag rm ${packageName} ${fromTag}`
      )
    },
  }

  return context
}
