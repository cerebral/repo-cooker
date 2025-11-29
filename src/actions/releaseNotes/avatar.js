import md5 from 'md5'

const DEFAULT_TYPE_HEADERS = {
  feat: ':fire: Feature change',
  fix: ':bug: Bug fixes',
  docs: ':paperclip: Documentation',
  style: ':pencil2: Styling',
  refactor: ':mag: Refactors',
  perf: ':runner: Performance',
  test: ':vertical_traffic_light: Tests',
  build: ':package: Build system',
  ci: ':construction_worker: Continuous Integration',
  chore: ':wrench: Chores',
  typing: ':pencil: Typing',
}

function createNewVersionsTable(release) {
  const entries = Object.keys(release.newVersionByPackage)
    .filter((packageName) => {
      return (
        release.newVersionByPackage[packageName] &&
        release.newVersionByPackage[packageName] !==
          release.currentVersionByPackage[packageName]
      )
    })
    .map((packageName) => {
      return `| ${packageName} | ${
        release.currentVersionByPackage[packageName] || ''
      } | ${release.newVersionByPackage[packageName]} |`
    })

  if (!entries.length) {
    return ''
  }

  return `## Updated packages

| package | from version | to version |
|:---|:---|:---|
${entries.join('\n')}
`
}

function affected(commit, pkgCount) {
  if (commit.affectedPackages.length === pkgCount) {
    return 'all'
  } else {
    return commit.affectedPackages.join(', ')
  }
}

function createChangeTable(header, pkgCount, commits) {
  if (!commits || commits.length === 0) {
    return ''
  }
  return `## ${header}
| package | summary | commit | issues | author | gravatar |
|:---|:---|:---|:---|:---|---|
${commits
  .map((commit) => {
    return `| ${affected(commit, pkgCount)} | ${commit.summary} | ${
      commit.hash
    } | ${commit.issues.join(', ')} | ${commit.author.name} | ![${
      commit.author.name
    }](https://www.gravatar.com/avatar/${md5(commit.author.email)}?s=40) |`
  })
  .join('\n')}
`
}

function createBreakingTable(release) {
  const breaking = release.commits.filter((commit) => commit.breaks.length > 0)
  const pkgCount = Object.keys(release.currentVersionByPackage).length

  if (breaking.length === 0) {
    return ''
  }

  return `## :rotating_light: Breaking
| package | summary | commit | issues | author | gravatar |
|:---|:---|:---|:---|:---|---|
${breaking
  .map((commit) => {
    return `| ${affected(commit, pkgCount)} | ${
      commit.summary
    } <ul>${commit.breaks.map((text) => `<li>*${text}*</li>`).join('')}</ul> | ${
      commit.hash
    } | ${commit.issues.join(', ')} | ${commit.author.name} | ![${
      commit.author.name
    }](https://www.gravatar.com/avatar/${md5(commit.author.email)}?s=40) |`
  })
  .join('\n')}
`
}

function createChangesTables(release, typeHeaders) {
  const pkgCount = Object.keys(release.currentVersionByPackage).length
  return Object.keys(typeHeaders)
    .map((type) =>
      createChangeTable(
        typeHeaders[type],
        pkgCount,
        release.commitsByType[type]
      )
    )
    .join('\n')
}

export function avatarNotes(release, options) {
  const typeHeaders = options.typeHeaders || DEFAULT_TYPE_HEADERS
  return `
${createNewVersionsTable(release)}
${createBreakingTable(release)}
${createChangesTables(release, typeHeaders)}
`
}
