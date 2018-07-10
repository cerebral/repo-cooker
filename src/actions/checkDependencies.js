import { join } from '../helpers/path'
import { readFileSync } from 'fs'

const dependencyTypes = ['dependencies', 'devDependencies']

/*
  Given a `dependencies` object in props, produce a summary of conflicts
  and updates for monorepo dependencies.
*/
export function checkDependencies({ config, props }) {
  const monorepo = JSON.parse(
    readFileSync(join(config.path, 'package.json'), 'utf8')
  )

  const packageDeps = props.dependencies
  if (!packageDeps) {
    throw new Error(
      `No 'dependencies' in props. Missing 'getDependencies' action ?`
    )
  }
  /**
   * type: 'install' | 'conflict' | 'noop'
   * dependency: dependency
   * monoVersion: => version in monorepo
   * version: version to install
   * packages: => key: version-in-package
   */

  const result = {}

  dependencyTypes.forEach(dependencyType => {
    const operations = {}
    Object.keys(packageDeps).forEach(packageName => {
      const dependencies = packageDeps[packageName][dependencyType]
      const monodeps = monorepo[dependencyType]
      if (dependencies) {
        Object.keys(dependencies).forEach(dependency => {
          // For each dependency in a specif package.
          if (packageDeps[dependency]) {
            // Dependency to our own libs: ignore
            return
          }
          const packageExactVersion = dependencies[dependency]
          const packageVersion = packageExactVersion.replace('^', '')
          const monoVersion = monodeps[dependency]
          let update = operations[dependency]
          if (!update) {
            // Simply store the first time we see this dependency.
            update = operations[dependency] = {
              dependency,
              monoVersion,
              packages: {},
              type: 'noop',
            }
          }
          // Add the version used in this package to the `packages` field.
          update.packages[packageName] = packageExactVersion
          if (!update.version) {
            // No change yet.
            if (packageVersion !== update.monoVersion) {
              // Need to update to monorepo version.
              update.type = 'install'
              update.version = packageVersion
            }
          } else if (update.version === packageVersion) {
            // OK: same version in other package.
          } else {
            // Conflicting versions in packages.
            update.type = 'conflict'
          }
        })
      }
    })

    // Create summary.
    const toInstall = Object.keys(operations)
      .filter(k => operations[k].type === 'install')
      .map(k => operations[k])

    // Conflicting versions.
    const conflict = Object.keys(operations)
      .filter(k => operations[k].type === 'conflict')
      .map(k => {
        return operations[k]
      })
    result[dependencyType] = { toInstall, conflict }
  })
  return { checkDependencies: result }
}
