const TYPES = ['major', 'minor', 'patch']
const PART_RE = /^\d+$/

const valid = PART_RE.test.bind(PART_RE)

function evaluateVersion(group, version, type) {
  const rawParts = version.split('.')
  if (rawParts.length !== 3 || !rawParts.every(valid)) {
    throw new Error(
      `Invalid version '${version}' for package '${group}' (format should be '[integer].[integer].[integer]').`
    )
  }
  const parts = rawParts.map(l => parseInt(l))
  let idx = TYPES.indexOf(type)
  if (idx < 0) {
    throw new Error(`Invalid semver type '${type}' for package '${group}'.`)
  }
  return []
    .concat(
      parts.slice(0, idx),
      [[parts[idx] + 1]],
      parts.slice(idx + 1).map(n => 0)
    )
    .join('.')
}

export function evaluateNewVersionsByPackage({
  props: {
    currentVersionsByPackage,
    semverByPackage,
    relatedPackagesByPackage,
  },
}) {
  const packages = Object.keys(semverByPackage)
  const newVersionsByPackage = packages.reduce((newVersionsByPackage, name) => {
    const currentVersion = currentVersionsByPackage[name]
    const dependedOnPackages = relatedPackagesByPackage.dependedOn[name]
    const dependedByPackages = relatedPackagesByPackage.dependedBy[name]
    /*
      Grab correct type of bump by passing in specific package bump, but then
      also go through what the package depends on, in case one of those packages
      has a higher bump
    */
    const type = dependedOnPackages.reduce((dependedOnType, dependedOnName) => {
      if (
        semverByPackage[dependedOnName] &&
        TYPES.indexOf(semverByPackage[dependedOnName]) <
          TYPES.indexOf(dependedOnType)
      ) {
        return semverByPackage[dependedOnName]
      }

      return dependedOnType
    }, semverByPackage[name])

    newVersionsByPackage[name] = evaluateVersion(name, currentVersion, type)

    /*
      Grab packages that has not changed, but has the currently iterated semver package as dependency,
      we need to bump that version as well with same version bump
    */
    const newVersionsByUnchangedPackage = dependedByPackages.reduce(
      (newVersionsByUnchangedPackage, dependedByName) => {
        if (!semverByPackage[dependedByName]) {
          newVersionsByUnchangedPackage[dependedByName] = evaluateVersion(
            dependedByName,
            currentVersionsByPackage[dependedByName],
            type
          )
        }

        return newVersionsByUnchangedPackage
      },
      {}
    )

    return Object.assign(newVersionsByPackage, newVersionsByUnchangedPackage)
  }, {})

  return {
    newVersionsByPackage,
  }
}
