import { backwardGraph, forwardGraph } from './helpers'
import { runAll } from '../helpers/runAll'

export function getCurrentVersionByPackage(ctx) {
  const { props, packageJson } = ctx
  const { semverByPackage, relatedPackagesByPackage } = props
  const changedPackages = Object.keys(semverByPackage)
  const touchedPackages = Object.keys(
    Object.assign(
      forwardGraph(relatedPackagesByPackage, changedPackages),
      backwardGraph(relatedPackagesByPackage, changedPackages)
    )
  )

  return (
    runAll(
      touchedPackages.map(name =>
        packageJson.get(name).then(info => {
          const type = info.publishTo || 'npm'
          const getter = ctx[type]
          if (!getter) {
            throw new Error(
              `Unknown publishType '${type}' for package '${name}'.`
            )
          }
          return getter
            .getCurrentPackageVersion(name, info)
            .then(version => ({ name, version }))
        })
      )
    )
      // Sort packages by name for consistent output
      .then(results => results.sort((a, b) => (a.name < b.name ? -1 : 1)))
      .then(results => ({
        currentVersionByPackage: results.reduce((acc, r) => {
          acc[r.name] = r.version
          return acc
        }, {}),
      }))
  )
}
