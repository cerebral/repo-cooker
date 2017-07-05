const SEMVER_TYPES = ['noop', 'patch', 'minor', 'major']
export function evaluateSemverByPackage(getType) {
  return function evaluateSemverByPackage({ props }) {
    const semverByPackage = props.commitsByPackage
      .map(group => ({
        name: group.name,
        type:
          SEMVER_TYPES[
            Math.max(
              ...group.commits
                .map(getType)
                .map(type => SEMVER_TYPES.indexOf(type)),
              0
            )
          ],
      }))
      .filter(group => group.type !== 'noop')
    return { semverByPackage }
  }
}
