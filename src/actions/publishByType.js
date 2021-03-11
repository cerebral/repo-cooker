import { logCommand } from '../helpers/execCommand'
import { runAll } from '../helpers/runAll'

export function publishByType(ctx) {
  const { config, packageJson, props } = ctx
  const packages = Object.keys(props.newVersionByPackage).filter(
    name =>
      props.newVersionByPackage[name] !== props.currentVersionByPackage[name]
  )

  // Need to ensure successful release of all packages, so
  // we publish under a temporary tag first
  return runAll(
    packages.map(name =>
      packageJson.get(name).then(info => {
        if (info.private) {
          return null
        } else {
          const type = info.publishTo || 'npm'
          if (!ctx[type]) {
            throw new Error(
              `Missing provider for publishType '${type}' for package '${name}'.`
            )
          } else if (ctx[type].validateVersion) {
            const newVersion = props.newVersionByPackage[name]
            if (!ctx[type].validateVersion(newVersion)) {
              logCommand('SKIP', [type, name], { version: newVersion })
              return null
            }
          }
          return { name, type }
        }
      })
    )
  )
    .then(results => results.filter(result => result !== null))
    .then(results =>
      runAll(
        results.map(({ name, type }) => ctx[type].publish(name, 'releasing'))
      )
        .then(() => ({
          temporaryNpmTagByPackage: results.reduce(
            (temporaryNpmTagByPackage, { name, type }) => {
              if (type === 'npm') {
                temporaryNpmTagByPackage[name] = 'releasing'
              }

              return temporaryNpmTagByPackage
            },
            {}
          ),
        }))
        .then(arg =>
          config.dryRun
            ? arg
            : new Promise(resolve => setTimeout(() => resolve(arg), 3000))
        )
    )
}
