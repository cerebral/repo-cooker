import { forwardGraph } from './helpers'

const TYPES = ['major', 'minor', 'patch']
const RTYPES = ['patch', 'minor', 'major']

const VERSION_RE = /^(\d+)\.(\d+)\.(\d+)/
function evaluateVersion(
  version,
  type,
  packageName,
  semver,
  initialVersion = ''
) {
  if (!type) {
    if (semver) {
      // Semver was provided but is wrong.
      throw new Error(
        `Invalid semver type '${semver}' for package '${packageName}'.`
      )
    }
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
  const newVersion = []
    .concat(
      parts.slice(0, idx),
      [[parts[idx] + 1]],
      parts.slice(idx + 1).map(n => 0)
    )
    .join('.')
  return newVersion > initialVersion ? newVersion : initialVersion
}

export function evaluateNewVersionByPackage({
  props: {
    currentVersionByPackage,
    semverByPackage,
    relatedPackagesByPackage,
    config,
  },
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
          ? config.initialVersion || '1.0.0'
          : evaluateVersion(
              currentVersionByPackage[packageName],
              RTYPES[resolve(packageName)],
              packageName,
              semverByPackage[packageName],
              config.initialVersion
            )

      return newVersionByPackage
    }, {})

  return {
    newVersionByPackage,
  }
}
