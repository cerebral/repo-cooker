/* eslint-env mocha */
import { testAction } from 'test-utils'
import { evaluateSemverByPackage } from './'

const commitsByPackage = [
  {
    name: 'foo',
    commits: [{ type: 'fix', breaks: [] }],
  },
  {
    name: 'bar',
    commits: [{ type: 'feat', breaks: [] }],
  },
  {
    name: 'noop',
    commits: [{ type: 'noop', breaks: [] }],
  },
  {
    name: 'baz',
    commits: [
      { type: 'fix', breaks: [] },
      { type: 'feat', breaks: [] },
      { type: 'fix', breaks: ['x'] },
    ],
  },
]

it('run the grouping function for every commit and group commits', done => {
  const semverByPackage = [
    { name: 'foo', type: 'patch' },
    { name: 'bar', type: 'minor' },
    // noop is filtered out
    { name: 'baz', type: 'major' },
  ]
  const typeToSemver = { feat: 'minor', fix: 'patch' }
  const filter = commit =>
    commit.breaks.length ? 'major' : typeToSemver[commit.type]
  testAction(
    evaluateSemverByPackage(filter),
    { commitsByPackage },
    { semverByPackage },
    done
  )
})
