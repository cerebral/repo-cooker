function showCommit(commit) {
  return `
  - ${commit.summary} ${
    commit.issues.length ? '(' + commit.issues.join(', ') + ')' : ''
  } - *${commit.author.name}*
    ${commit.breaks
      .map(breakInfo => {
        return `- ${breakInfo}`
      })
      .join('\n')}
`
}

function showPackageSummary(packageSummary) {
  return `
#### ${packageSummary.name} - ${packageSummary.version}
  ${packageSummary.commits.map(showCommit).join('\n')}
`
}

function writeBreaks(breaks) {
  if (!breaks) {
    return ''
  }

  return `
## ${breaks.length} breaking
${breaks.map(showPackageSummary).join('\n')}
---
`
}

function writeFixes(fix) {
  if (!fix) {
    return ''
  }

  return `
## ${fix.length} ${fix.length === 1 ? 'fix' : 'fixes'}
${fix.map(showPackageSummary).join('\n')}
---
`
}

function writeFeat(feat) {
  if (!feat) {
    return ''
  }

  return `
## ${feat.length} ${feat.length === 1 ? 'feature' : 'features'}
${feat.map(showPackageSummary).join('\n')}
---
`
}

export function simpleNotes(release) {
  return `${writeBreaks(release.summary.breaks)}
${writeFixes(release.summary.fix)}
${writeFeat(release.summary.feat)}
`
}
