const SEMVER_TYPES = ['noop', 'patch', 'minor', 'major']
const typeToSemver = { feat: 'minor', fix: 'patch' }

function getType(commits) {
  const types = commits
    .map(commit => (commit.breaks.length ? 'major' : typeToSemver[commit.type]))
    .map(type => SEMVER_TYPES.indexOf(type))
  const type = Math.max(...types, 0)

  return SEMVER_TYPES[type]
}

export function evaluateSemverByPackage({ props }) {
  const commitsByPackage = props.commitsByPackage
  const packages = Object.keys(commitsByPackage)
  const semverByPackage = packages
    .map(name => getType(commitsByPackage[name]))
    .reduce((semverByPackage, type, index) => {
      if (type !== 'noop') {
        semverByPackage[packages[index]] = type
      }

      return semverByPackage
    }, {})

  return { semverByPackage }
}
