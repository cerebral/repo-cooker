import { parseHeader } from './parseHeader'

const breakingRe = /^\s*BREAKING CHANGES?:/
const issuesRe = /^\s*ISSUES CLOSED:\s*(.*)$/

/**
 * type(scope): message
 * 
 * Yada yada yada
 * 
 * yada yada yada
 * 
 * ISSUES CLOSED: #xxx, #yyy
 * BREAKING CHANGE:
 * - this
 * - that
 */
export function parseCommit(commit) {
  const message = commit.message
  const lines = message.split('\n')
  const header = lines.shift()
  const body = []
  let issues = []
  const breaks = []
  let current = body
  lines.forEach(line => {
    if (breakingRe.test(line)) {
      current = breaks
    } else if (issuesRe.test(line)) {
      issues = issuesRe.exec(line)[1].split(',').map(s => s.trim())
      current = body
    } else {
      current.push(line.trim())
    }
  })
  return Object.assign(
    {},
    commit,
    {
      body: body.join('\n').trim(),
      issues,
      breaks: breaks.filter(b => b !== ''),
    },
    parseHeader(header)
  )
}
