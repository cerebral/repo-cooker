import { groupCommitsByPackage } from './'
import { resolve } from '../helpers/path'
import { testAction } from 'test-utils'

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

it('should run the grouping function for every commit and group commits', (done) => {
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

it('should not get confused by similar package names', (done) => {
  const commits = [
    {
      hash: 'foobar',
      type: 'feat',
      files: ['packages/foobar/src/something.js'],
    },
    {
      hash: 'foo',
      type: 'feat',
      files: ['packages/foo/src/something.js'],
    },
  ]
  const commitsByPackage = {
    foobar: [commits[0]],
    foo: [commits[1]],
  }

  function mockPackages({ config }) {
    config.packagesPaths = {
      foo: resolve('/root/packages/foo'),
      foobar: resolve('/root/packages/foobar'),
    }
    config.path = '/root'
  }

  testAction(
    [mockPackages, groupCommitsByPackage],
    { commits },
    { commitsByPackage },
    done
  )
})
