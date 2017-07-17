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
  return Promise.all(
    props.semverByPackage.map(({ name }) =>
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
