import { runAll } from '../helpers/runAll'

/*
  For each package, return a list of related packages on which this
  package depends.
*/
export function relatedPackagesByPackage({ config, packageJson, props }) {
  const allPackageNames = Object.keys(config.packagesPaths)

  return runAll(
    allPackageNames.map(name => packageJson.getRelatedPackages(name))
  )
    .then(allRelatedPackages =>
      allPackageNames.reduce((dependsOn, packageName, index) => {
        dependsOn[packageName] = allRelatedPackages[index]

        return dependsOn
      }, {})
    )
    .then(relatedPackagesByPackage => ({ relatedPackagesByPackage }))
}
