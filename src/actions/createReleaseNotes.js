function summarizeRelease({
  commitsByPackage,
  commitsWithoutPackage,
  newVersionByPackage,
  currentVersionByPackage,
  tag,
}) {
  let summary = {}
  Object.keys(commitsByPackage).forEach(name => {
    let commitsByType = {}

    function insertCommit(type, commit) {
      if (summary[type] === undefined) {
        summary[type] = []
      }
      if (commitsByType[type] === undefined) {
        commitsByType[type] = {
          name,
          version: newVersionByPackage[name],
          currentVersion: currentVersionByPackage[name],
          commits: [],
        }
        summary[type].push(commitsByType[type])
      }
      commitsByType[type].commits.push(commit)
    }

    commitsByPackage[name].forEach(commit => {
      if (commit.breaks.length) {
        insertCommit('breaks', commit)
      } else {
        insertCommit(commit.type, commit)
      }
    })
  })

  return {
    tag,
    newVersionByPackage,
    currentVersionByPackage,
    commitsWithoutPackage,
    summary: Object.keys(summary).sort().reduce((acc, key) => {
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
