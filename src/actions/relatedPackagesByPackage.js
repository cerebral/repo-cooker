export function relatedPackagesByPackage({ config, packageJson, props }) {
  const allPackageNames = Object.keys(config.packagesPaths)

  return Promise.all(
    allPackageNames.map(name => packageJson.getRelatedPackages(name))
  ).then(allRelatedPackages => ({
    relatedPackagesByPackage: allPackageNames.reduce(
      (relatedPackagesByPackage, packageName, index) => {
        relatedPackagesByPackage[packageName] = allRelatedPackages[index]

        return relatedPackagesByPackage
      },
      {}
    ),
  }))
}
