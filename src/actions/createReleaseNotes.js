const match = (commit, type) =>
  commit.type === type || (type === 'breaks' && commit.breaks.length)

function extract(commitsByPackage, newVersionByPackage, type) {
  const packages = Object.keys(commitsByPackage)

  return packages
    .map(name => ({
      name,
      version: newVersionByPackage[name],
      commits: commitsByPackage[name].filter(commit => match(commit, type)),
    }))
    .filter(({ commits }) => commits.length)
}

function summarizeRelease({ commitsByPackage, newVersionByPackage, tag }) {
  return Object.assign({}, tag, {
    fix: extract(commitsByPackage, newVersionByPackage, 'fix'),
    feat: extract(commitsByPackage, newVersionByPackage, 'feat'),
    breaks: extract(commitsByPackage, newVersionByPackage, 'breaks'),
  })
}

export function createReleaseNotes(template) {
  return function createReleaseNotes({ props }) {
    return { releaseNotes: template(summarizeRelease(props)) }
  }
}
