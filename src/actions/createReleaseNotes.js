import * as builtinTemplates from './releaseNotes'

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
          commits: [],
        }
        summary[type].push(commitsByType[type])
      }
      commitsByType[type].commits.push(commit)
    }

    commitsByPackage[name].forEach(commit => {
      insertCommit(commit.type, commit)
    })
  })

  return {
    tag,
    newVersionByPackage,
    currentVersionByPackage,
    commitsWithoutPackage,
    summary: Object.keys(summary)
      .sort()
      .reduce((acc, key) => {
        acc[key] = summary[key]
        return acc
      }, {}),
  }
}

export function createReleaseNotes(templateArg, options = {}) {
  let template
  if (typeof templateArg === 'string') {
    template = builtinTemplates[templateArg]
    if (!template) {
      throw new Error(
        `Unknown builtin template '${templateArg}' (not one of ${Object.keys(
          builtinTemplates
        ).join(', ')}`
      )
    }
  } else {
    template = templateArg
  }
  return function createReleaseNotes({ props }) {
    const releaseNotes = template(summarizeRelease(props), options)
    if (props.argv.includes('--print-release')) {
      console.log(releaseNotes)
    }
    return { releaseNotes }
  }
}
