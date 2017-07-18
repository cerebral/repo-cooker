/* eslint-env mocha */
import { testAction } from 'test-utils'
import { groupCommitsByPackage } from './'

const commits = [
  {
    hash: 'foobar',
    type: 'feat',
    files: [
      'packages/node_modules/@repo-cooker-test/commis/src/something.js',
      'packages/node_modules/@repo-cooker-test/entremetier/src/plop.js',
    ],
  },
  {
    hash: 'foo',
    type: 'feat',
    files: [
      'packages/node_modules/@repo-cooker-test/commis/src/boz.js',
      'packages/node_modules/@repo-cooker-test/commis/src/plop.js',
    ],
  },
  {
    hash: 'fool',
    type: 'feat',
    files: ['packages/node_modules/@repo-cooker-test/commis/src/bing.js'],
  },
  {
    hash: 'bar',
    type: 'feat',
    files: ['packages/node_modules/@repo-cooker-test/entremetier/src/other.js'],
  },
  {
    hash: 'barman',
    type: 'fix',
    files: ['packages/node_modules/@repo-cooker-test/entremetier/src/other.js'],
  },
  {
    hash: 'barometer',
    type: 'fix',
    files: [
      'packages/node_modules/@repo-cooker-test/entremetier/src/temperature.js',
    ],
  },
]

it('run the grouping function for every commit and group commits', done => {
  const commitsByPackage = {
    '@repo-cooker-test/commis': [commits[0], commits[1], commits[2]],
    '@repo-cooker-test/entremetier': [
      commits[0],
      commits[3],
      commits[4],
      commits[5],
    ],
  }

  testAction(groupCommitsByPackage, { commits }, { commitsByPackage }, done)
})
