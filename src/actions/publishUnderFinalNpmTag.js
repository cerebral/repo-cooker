import { logCommand } from '../helpers/execCommand'
import { runAll } from '../helpers/runAll'

export function publishUnderFinalNpmTag(tagName) {
  return function publishUnderFinalNpmTag(ctx) {
    const { packageJson, props } = ctx
    const packages = Object.keys(props.newVersionByPackage).filter(
      (name) =>
        props.newVersionByPackage[name] !== props.currentVersionByPackage[name]
    )

    // When publishing with the npm trusted publishing workflow we're not able to
    // change the tag on publish, so we need to publish under the final tag directly
    return runAll(
      packages.map((name) =>
        packageJson.get(name).then((info) => {
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
                logCommand('skip publish', [type, name], {
                  version: newVersion,
                })
                return null
              }
            }
            return { name, type }
          }
        })
      )
    )
      .then((results) => results.filter((result) => result !== null))
      .then((results) =>
        runAll(
          results.map(({ name, type }) => ctx[type].publish(name, tagName))
        ).then(() => ({
          [`${tagName}NpmTagByPackage`]: results.reduce(
            (latestNpmTagByPackage, { name, type }) => {
              if (type === 'npm') {
                latestNpmTagByPackage[name] = tagName
              }

              return latestNpmTagByPackage
            },
            {}
          ),
        }))
      )
  }
}
