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

function getType(semverByPackage, nameToFind) {
  const group = semverByPackage.find(({ name }) => name === nameToFind)
  if (!group) {
    throw new Error(`Missing package '${nameToFind}' in semverByPackage.`)
  }
  return group.type
}

function getAffectedUnchangedPackages(
  name,
  semverByPackage,
  relatedPackagesByPackage
) {
  return Object.keys(relatedPackagesByPackage).reduce((acc, packageName) => {
    if (
      !semverByPackage.find(({ name }) => name === packageName) &&
      relatedPackagesByPackage[packageName].indexOf(name) >= 0
    ) {
      return acc.concat(packageName)
    }

    return acc
  }, [])
}

export function evaluateNewVersionsByPackage({
  props: {
    currentVersionsByPackage,
    semverByPackage,
    relatedPackagesByPackage,
  },
}) {
  return semverByPackage
    .reduce((acc, { name }) => {
      const version = currentVersionsByPackage.find(
        currentVersionPckg => currentVersionPckg.name === name
      ).version
      let type = getType(semverByPackage, name)
      const relatedPackage = acc.find(
        newVersionPackage =>
          relatedPackagesByPackage[name].indexOf(newVersionPackage.name) >= 0
      )
      if (
        relatedPackage &&
        TYPES.indexOf(getType(semverByPackage, relatedPackage.name)) <
          TYPES.indexOf(getType(semverByPackage, name))
      ) {
        type = getType(semverByPackage, relatedPackage.name)
      }

      /*
        There might be an update to a "core" package, meaning that packages
        without changes might need to bump version due to a dependency to a "core"
        package
      */
      const affectedUnchangedPackages = getAffectedUnchangedPackages(
        name,
        semverByPackage,
        relatedPackagesByPackage
      )

      affectedUnchangedPackages.forEach(affectedUnchangedPackage => {
        acc.push({
          name: affectedUnchangedPackage,
          version: evaluateVersion(affectedUnchangedPackage, version, type),
        })
      })

      acc.push({
        name,
        version: evaluateVersion(name, version, type),
      })

      return acc
    }, [])
    .reduce(
      (acc, evaluatedVersion) => {
        if (
          !acc.newVersionsByPackage.find(
            ({ name }) => evaluatedVersion.name === name
          )
        ) {
          acc.newVersionsByPackage.push(evaluatedVersion)
        }

        return acc
      },
      { newVersionsByPackage: [] }
    )
}
