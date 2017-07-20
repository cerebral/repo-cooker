const TYPES = ['major', 'minor', 'patch']
const RTYPES = ['patch', 'minor', 'major']
const PART_RE = /^\d+$/

const valid = PART_RE.test.bind(PART_RE)

function evaluateVersion(version, type, packageName, semver) {
  const rawParts = version.split('.')
  if (rawParts.length !== 3 || !rawParts.every(valid)) {
    throw new Error(
      `Invalid version '${version}' for package '${packageName}' (format should be '[integer].[integer].[integer]').`
    )
  }
  const parts = rawParts.map(l => parseInt(l))
  let idx = TYPES.indexOf(type)
  if (idx < 0) {
    throw new Error(
      `Invalid semver type '${semver}' for package '${packageName}'.`
    )
  }
  return []
    .concat(
      parts.slice(0, idx),
      [[parts[idx] + 1]],
      parts.slice(idx + 1).map(n => 0)
    )
    .join('.')
}

export function evaluateNewVersionByPackage({
  props: { currentVersionByPackage, semverByPackage, relatedPackagesByPackage },
}) {
  const packageSemverId = {}
  const resolve = packageName =>
    (packageSemverId[packageName] =
      packageName in packageSemverId
        ? packageSemverId[packageName]
        : Math.max(
            RTYPES.indexOf(semverByPackage[packageName]),
            ...relatedPackagesByPackage[packageName].map(resolve)
          ))
  const newVersionByPackage = Object.keys(
    semverByPackage
  ).reduce((newVersionByPackage, packageName) => {
    newVersionByPackage[packageName] =
      currentVersionByPackage[packageName] === null
        ? '1.0.0'
        : evaluateVersion(
            currentVersionByPackage[packageName],
            RTYPES[resolve(packageName)],
            // Error reporting
            packageName,
            semverByPackage[packageName]
          )

    return newVersionByPackage
  }, {})

  return {
    newVersionByPackage,
  }
}
