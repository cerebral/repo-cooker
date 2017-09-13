function Commit(item) {
  return `
  - ${item.summary} ${item.issues.length
    ? '(' + item.issues.join(', ') + ')'
    : ''} - *${item.author.name}*
    ${item.breaks.map(item => {
      return `- ${item}`
    })}
`
}

function Package(item) {
  return `
#### ${item.name} - ${item.version}
  ${item.commits.map(Commit)}
`
}

function writeBreaks(breaks) {
  if (!breaks) {
    return ''
  }

  return `
## ${breaks.length} breaking
${breaks.map(Package)}
---
`
}

function writeFixes(fix) {
  if (!fix) {
    return ''
  }

  return `
## ${fix.length} ${fix.length === 1 ? 'fix' : 'fixes'}
${fix.map(Package)}
---
`
}

function writeFeat(feat) {
  if (!feat) {
    return ''
  }

  return `
## ${feat.length} ${feat.length === 1 ? 'feature' : 'features'}
${feat.map(Package)}
---
`
}

export default release => {
  return `${writeBreaks(release.summary.breaks)}
${writeFixes(release.summary.fix)}
${writeFeat(release.summary.feat)}

With :heart: from the Cerebral Team!
`
}
