import assert from 'test-utils/assert'
import { fixDependencies } from './'
import { fs } from './helpers'
import { testAction } from 'test-utils'

const toInstallDeps = {
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
}
const noChangeDeps = { toInstall: [], conflict: [] }
const conflictDeps = {
  toInstall: [],
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
}

describe('fixDependencies', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockReturnValue(null)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should throw on conflict in dependencies', (done) => {
    testAction(
      [
        fixDependencies,
        () => {
          throw new Error('Should not run')
        },
      ],
      {
        checkDependencies: {
          dependencies: conflictDeps,
          devDependencies: noChangeDeps,
        },
      },
      {},
      done,
      {
        path: '.',
        packagesGlobs: ['test/deps-fixtures/*'],
      },
      (error) => {
        assert.equal(error.message, 'Dependencies have conflicts.', done)
      }
    )
  })

  it('should throw on conflict in devDependencies', (done) => {
    testAction(
      [
        fixDependencies,
        () => {
          throw new Error('Should not run')
        },
      ],
      {
        checkDependencies: {
          dependencies: toInstallDeps,
          devDependencies: conflictDeps,
        },
      },
      {},
      done,
      {
        path: '.',
        packagesGlobs: ['test/deps-fixtures/*'],
      },
      (error) => {
        assert.equal(
          error.message,
          'Dependencies need install and have conflicts.',
          done
        )
      }
    )
  })

  it('should fix install with --fix-dependencies', (done) => {
    let updatedPackageJson
    testAction(
      [
        () => {
          jest.spyOn(fs, 'writeFileSync').mockImplementation((path, data) => {
            updatedPackageJson = data
          })
        },
        fixDependencies,
        () => {
          assert.equal(typeof updatedPackageJson, 'string')
        },
      ],
      {
        checkDependencies: {
          dependencies: noChangeDeps,
          devDependencies: toInstallDeps,
        },
        argv: ['--fix-dependencies'],
      },
      {},
      done,
      {
        path: '.',
        packagesGlobs: ['test/deps-fixtures/*'],
      }
    )
  })

  it('should not fix install with --fix-dependencies on conflict', (done) => {
    let updatedPackageJson
    testAction(
      [
        () => {
          jest.spyOn(fs, 'writeFileSync').mockImplementation((path, data) => {
            updatedPackageJson = data
          })
        },
        fixDependencies,
        () => {
          throw new Error('Should not run')
        },
      ],
      {
        checkDependencies: {
          dependencies: conflictDeps,
          devDependencies: toInstallDeps,
        },
        argv: ['--fix-dependencies'],
      },
      { fixDependencies: 'should not check because we throw an Error' },
      done,
      {
        path: '.',
        packagesGlobs: ['test/deps-fixtures/*'],
      },
      () => {
        assert.equal(typeof updatedPackageJson, 'undefined', done)
      }
    )
  })
})
