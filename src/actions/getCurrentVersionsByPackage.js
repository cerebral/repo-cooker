function byRelatedPackages(relatedPackagesByPackage) {
  return function sort(packA, packB) {
    if (
      relatedPackagesByPackage[packA.name].length >
        relatedPackagesByPackage[packB.name].length ||
      relatedPackagesByPackage[packA.name].indexOf(packB.name) >= 0
    ) {
      return 1
    } else if (
      relatedPackagesByPackage[packA.name].length <
        relatedPackagesByPackage[packB.name].length ||
      relatedPackagesByPackage[packB.name].indexOf(packA.name) >= 0
    ) {
      return -1
    }

    return 0
  }
}

export function getCurrentVersionsByPackage({ npm, props }) {
  const packages = props.semverByPackage.concat(
    ...props.semverByPackage
      .reduce((acc, { name }) => {
        return acc.concat(props.relatedPackagesByPackage[name])
      }, [])
      .reduce((acc, pckgName) => {
        if (acc.indexOf(pckgName) === -1) {
          return acc.concat({ name: pckgName })
        }

        return acc
      }, [])
  )

  return Promise.all(
    packages.map(({ name }) =>
      npm.getCurrentPackageVersion(name).then(version => ({
        name,
        version,
      }))
    )
  ).then(currentVersionsByPackage => ({
    currentVersionsByPackage: currentVersionsByPackage.sort(
      byRelatedPackages(props.relatedPackagesByPackage)
    ),
  }))
}
