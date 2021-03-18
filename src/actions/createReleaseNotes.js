import * as builtinTemplates from './releaseNotes'

function groupCommitsByType(commits) {
  if (!commits) {
    return {}
  }
  const groups = {}
  for (const commit of commits) {
    if (!groups[commit.type]) {
      groups[commit.type] = []
    }
    groups[commit.type].push(commit)
  }
  return Object.assign(
    {},
    ...Object.keys(groups)
      .sort()
      .map(k => ({ [k]: groups[k] }))
  )
}

function summarizeRelease({
  commits,
  commitsByPackage,
  commitsWithoutPackage,
  newVersionByPackage,
  currentVersionByPackage,
  tag,
}) {
  const summary = {}
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
    commits,
    commitsByType: groupCommitsByType(commits),
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
    const releaseNotes = props.commits
      ? template(summarizeRelease(props), options).replace(/\n\n[\n]+/g, '\n\n')
      : ''
    if (props.argv.includes('--print-release')) {
      console.log(releaseNotes)
    }
    return { releaseNotes }
  }
}
