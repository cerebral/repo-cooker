const match = (commit, type) =>
  commit.type === type || (type === 'breaks' && commit.breaks.length)

function extract(commitsByPackage, newVersionsByPackage, type) {
  const packages = Object.keys(commitsByPackage)

  return packages
    .map(name => ({
      name,
      version: newVersionsByPackage[name],
      commits: commitsByPackage[name].filter(commit => match(commit, type)),
    }))
    .filter(({ commits }) => commits.length)
}

function summarizeRelease({ commitsByPackage, newVersionsByPackage, tag }) {
  return Object.assign({}, tag, {
    fix: extract(commitsByPackage, newVersionsByPackage, 'fix'),
    feat: extract(commitsByPackage, newVersionsByPackage, 'feat'),
    breaks: extract(commitsByPackage, newVersionsByPackage, 'breaks'),
  })
}

export function createReleaseNotes(template) {
  return function createReleaseNotes({ props }) {
    return { releaseNotes: template(summarizeRelease(props)) }
  }
}
