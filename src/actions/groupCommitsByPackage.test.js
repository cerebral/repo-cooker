/* eslint-env mocha */
import { testAction } from 'test-utils'
import { groupCommitsByPackage } from './'

const commits = [
  {
    hash: 'foobar',
    type: 'feat',
    files: ['/packages/foo/src/something.js', '/packages/bar/src/plop.js'],
  },
  {
    hash: 'foo',
    type: 'feat',
    files: ['/packages/foo/src/boz.js', '/packages/foo/src/plop.js'],
  },
  { hash: 'fool', type: 'feat', files: ['/packages/foo/src/bing.js'] },
  { hash: 'bar', type: 'feat', files: ['/packages/bar/src/other.js'] },
  { hash: 'barman', type: 'fix', files: ['/packages/bar/src/other.js'] },
  { hash: 'pok', type: 'chore', files: ['.gitignore'] },
  {
    hash: 'pak',
    type: 'chore',
    files: ['.gitignore', '/packages/bar/src/.gitignore'],
  },
  {
    hash: 'barometer',
    type: 'fix',
    files: ['/packages/bar/src/temperature.js'],
  },
]

const getCommit = hash => commits.find(c => c.hash === hash)

it('run the grouping function for every commit and group commits', done => {
  const commitsByPackage = [
    { name: 'foo', commits: ['foobar', 'foo', 'fool'].map(getCommit) },
    {
      name: 'bar',
      commits: ['foobar', 'bar', 'barman', 'barometer'].map(getCommit),
    },
    // pok and pak are 'chore' and ignored
  ]
  // We simulate a "touched" package by looking at file path matching 'packages/[packageName]/src/xxx
  const fileMap = path => (/^\/packages\/(\w+)\/src\//.exec(path) || [])[1]
  // Return a list of possibly non-unique, with possibly undefined names of packages
  // affected by this commit
  const commitTypes = ['feat', 'fix']
  const filter = commit =>
    commitTypes.indexOf(commit.type) >= 0 ? commit.files.map(fileMap) : []
  testAction(
    groupCommitsByPackage(filter),
    { commits },
    { commitsByPackage },
    done
  )
})
