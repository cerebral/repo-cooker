import { backwardGraph, forwardGraph } from './helpers'

export function getCurrentVersionByPackage({ config, npm, props }) {
  const { semverByPackage, relatedPackagesByPackage } = props
  const changedPackages = Object.keys(semverByPackage)
  const touchedPackages = Object.keys(
    Object.assign(
      forwardGraph(relatedPackagesByPackage, changedPackages),
      backwardGraph(relatedPackagesByPackage, changedPackages)
    )
  )
  return Promise.all(
    touchedPackages.map(name =>
      npm.getCurrentPackageVersion(name).then(version => ({ name, version }))
    )
    // Sort packages by name for consistent output
  )
    .then(results => results.sort((a, b) => (a.name < b.name ? -1 : 1)))
    .then(results => ({
      currentVersionByPackage: results.reduce((acc, r) => {
        acc[r.name] = r.version
        return acc
      }, {}),
    }))
}
