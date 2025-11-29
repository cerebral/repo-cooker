import { checkDependencies, getDependencies } from './'

import { testAction } from 'test-utils'

describe('checkDependencies', () => {
  it('should check dependencies for conflict', (done) => {
    const checkDeps = {
      dependencies: {
        toInstall: [
          {
            dependency: 'foo',
            packages: {
              lion: '^1.0.0',
              panther: '^1.0.0',
              tiger: '^1.0.0',
            },
            type: 'install',
            version: '1.0.0',
          },
        ],
        conflict: [],
      },
      devDependencies: {
        toInstall: [
          {
            dependency: 'bing',
            packages: {
              panther: '^2.3.4',
            },
            type: 'install',
            version: '2.3.4',
          },
          {
            dependency: 'bong',
            packages: {
              tiger: '^1.2.3',
            },
            type: 'install',
            version: '1.2.3',
          },
        ],
        conflict: [
          {
            dependency: 'bar',
            packages: {
              lion: '^2.0.0',
              tiger: '^2.5.0',
            },
            type: 'conflict',
            version: '2.0.0',
          },
        ],
      },
    }

    testAction(
      [getDependencies, checkDependencies],
      {},
      { checkDependencies: checkDeps },
      done,
      {
        path: '.',
        packagesGlobs: ['test/deps-fixtures/*'],
      }
    )
  })
})
