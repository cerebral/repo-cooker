function summarizeRelease({ commitsByPackage, newVersionByPackage, tag }) {
  const summary = {}
  Object.keys(commitsByPackage).forEach(name => {
    const commitsByType = {}

    function insertCommit(type, commit) {
      if (summary[type] === undefined) {
        summary[type] = []
      }
      if (commitsByType[type] === undefined) {
        commitsByType[type] = {
          name,
          version: newVersionByPackage[name],
          commits: [],
        }
        summary[type].push(commitsByType[type])
      }
      commitsByType[type].commits.push(commit)
    }

    commitsByPackage[name].forEach(commit => {
      insertCommit(commit.type, commit)
      if (commit.breaks.length) {
        insertCommit('breaks', commit)
      }
    })
  })

  return {
    tag,
    summary: Object.keys(summary)
      .sort()
      .reduce((acc, key) => {
        acc[key] = summary[key]
        return acc
      }, {}),
  }
}

export function createReleaseNotes(template) {
  return function createReleaseNotes({ props }) {
    return { releaseNotes: template(summarizeRelease(props)) }
  }
}
