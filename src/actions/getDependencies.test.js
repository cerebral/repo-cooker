import { getDependencies } from './'
import { testAction } from 'test-utils'

describe('getDependencies', () => {
  it('should get dependencies for each package', (done) => {
    const dependencies = {
      lion: {
        dependencies: {
          foo: '^1.0.0',
        },
        devDependencies: {
          bar: '^2.0.0',
        },
        peerDependencies: {
          baz: '^3.0.0',
        },
      },
      panther: {
        dependencies: {
          foo: '^1.0.0',
        },
        devDependencies: {
          bing: '^2.3.4',
        },
        peerDependencies: {
          baz: '^3.0.0',
        },
      },
      tiger: {
        dependencies: {
          foo: '^1.0.0',
        },
        devDependencies: {
          bar: '^2.5.0',
          bong: '^1.2.3',
        },
        peerDependencies: {
          baz: '^3.0.0',
        },
      },
    }

    testAction(getDependencies, {}, { dependencies }, done, {
      path: '.',
      packagesGlobs: ['test/deps-fixtures/*'],
    })
  })
})
