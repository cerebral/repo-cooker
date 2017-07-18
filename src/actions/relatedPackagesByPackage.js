/*
  Returns two maps. One where it lists packages and what they depend on (dependedOn).
  Then packages and what packages depend on them (dependedBy)
*/
export function relatedPackagesByPackage({ config, packageJson, props }) {
  const allPackageNames = Object.keys(config.packagesPaths)

  return Promise.all(
    allPackageNames.map(name => packageJson.getRelatedPackages(name))
  ).then(allRelatedPackages => {
    const dependedOn = allPackageNames.reduce(
      (dependedOn, packageName, index) => {
        dependedOn[packageName] = allRelatedPackages[index]

        return dependedOn
      },
      {}
    )
    const dependedBy = Object.keys(dependedOn).reduce((dependedBy, name) => {
      if (!dependedBy[name]) {
        dependedBy[name] = []
      }

      dependedOn[name].forEach(dependedOnName => {
        if (!dependedBy[dependedOnName]) {
          dependedBy[dependedOnName] = []
        }

        dependedBy[dependedOnName].push(name)
      })

      return dependedBy
    }, {})

    return {
      relatedPackagesByPackage: {
        dependedOn,
        dependedBy,
      },
    }
  })
}
