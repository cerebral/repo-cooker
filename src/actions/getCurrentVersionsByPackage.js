function sortByNumberOfDependencies(dependedOn) {
  return function sort(packA, packB) {
    if (
      dependedOn[packA.name].length > dependedOn[packB.name].length ||
      dependedOn[packA.name].indexOf(packB.name) >= 0
    ) {
      return 1
    } else if (
      dependedOn[packA.name].length < dependedOn[packB.name].length ||
      dependedOn[packB.name].indexOf(packA.name) >= 0
    ) {
      return -1
    }

    return 0
  }
}

function getRelatedSemverPackages(semverPackages, relatedPackagesByPackage) {
  return semverPackages
    .reduce((relatedPackages, name) => {
      return semverPackages.concat(
        relatedPackagesByPackage.dependedOn[name],
        relatedPackagesByPackage.dependedBy[name]
      )
    }, [])
    .reduce((uniqueRelatedPackages, name) => {
      if (uniqueRelatedPackages.indexOf(name) === -1) {
        return uniqueRelatedPackages.concat(name)
      }

      return uniqueRelatedPackages
    }, [])
}

export function getCurrentVersionsByPackage({ npm, props }) {
  const { semverByPackage, relatedPackagesByPackage } = props
  const semverPackages = Object.keys(semverByPackage)
  const relatedSemverPackages = getRelatedSemverPackages(
    semverPackages,
    relatedPackagesByPackage
  )
  const packages = semverPackages.concat(relatedSemverPackages)

  return Promise.all(
    packages.map(name =>
      npm.getCurrentPackageVersion(name).then(version => ({
        name,
        version,
      }))
    )
  ).then(packages => ({
    currentVersionsByPackage: packages
      .sort(sortByNumberOfDependencies(relatedPackagesByPackage.dependedOn))
      .reduce((currentVersionsByPackage, pckg) => {
        currentVersionsByPackage[pckg.name] = pckg.version

        return currentVersionsByPackage
      }, {}),
  }))
}
