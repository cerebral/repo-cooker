import { forwardGraph } from './helpers'

const TYPES = ['major', 'minor', 'patch']
const RTYPES = ['patch', 'minor', 'major']

const VERSION_RE = /^(\d+)\.(\d+)\.(\d+)/
function evaluateVersion(version, type, packageName, semver) {
  if (!semver) {
    // No changes
    return version
  }
  const re = VERSION_RE.exec(version)
  if (!re) {
    throw new Error(
      `Invalid version '${version}' for package '${packageName}' (format should be '[integer].[integer].[integer][anything]').`
    )
  }

  const parts = [re[1], re[2], re[3]].map(l => parseInt(l))
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
  function resolve(packageName) {
    // Bump version according to package dependencies
    return Math.max(
      ...Object.keys(forwardGraph(relatedPackagesByPackage, [packageName])).map(
        packageName =>
          packageName in semverByPackage
            ? RTYPES.indexOf(semverByPackage[packageName])
            : -1
      )
    )
  }
  const newVersionByPackage = Object.keys(
    // We evaluate for all packages related to changed packages
    currentVersionByPackage
  )
    .sort()
    .reduce((newVersionByPackage, packageName) => {
      newVersionByPackage[packageName] =
        currentVersionByPackage[packageName] === null
          ? '1.0.0'
          : semverByPackage[packageName]
            ? evaluateVersion(
                currentVersionByPackage[packageName],
                RTYPES[resolve(packageName)],
                // Error reporting
                packageName,
                semverByPackage[packageName]
              )
            : // No semver change: same version.
              currentVersionByPackage[packageName]

      return newVersionByPackage
    }, {})

  return {
    newVersionByPackage,
  }
}
