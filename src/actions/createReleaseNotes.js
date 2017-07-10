const match = (commit, type) =>
  commit.type === type || (type === 'breaks' && commit.breaks.length)

function extract(commitsByPackage, newVersionByPackage, type) {
  return commitsByPackage
    .map(group => ({
      name: group.name,
      version: newVersionByPackage.find(({ name }) => name === group.name)
        .version,
      commits: group.commits.filter(commit => match(commit, type)),
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
