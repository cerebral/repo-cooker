import { runAll } from '../helpers/runAll'
/*
  For each package, return the depencencies.
*/
export function getDependencies({ config, packageJson, props }) {
  const allPackageNames = Object.keys(config.packagesPaths)

  return runAll(
    allPackageNames.map(name =>
      packageJson.getDependencies(name).then(deps => ({ [name]: deps }))
    )
  ).then(allDeps => ({ dependencies: Object.assign({}, ...allDeps) }))
}
