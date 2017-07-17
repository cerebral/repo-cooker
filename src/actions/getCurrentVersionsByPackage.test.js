/* eslint-env mocha */
import simple from 'simple-mock'
import { testAction } from 'test-utils'
import { mockNpmRegistry, versions } from 'test-utils/npm'
import { getCurrentVersionsByPackage } from './'

describe('getCurrentVersionsByPackage', () => {
  before(mockNpmRegistry)
  after(() => simple.restore())

  it('should get current versions for each package', done => {
    const semverByPackage = [
      { name: '@repo-cooker-test/commis' },
      { name: 'repo-cooker-test' },
    ]
    const currentVersionsByPackage = semverByPackage.map(({ name }) => ({
      name,
      version: versions[name],
    }))
    const relatedPackagesByPackage = {
      '@repo-cooker-test/commis': [],
      'repo-cooker-test': [],
    }
    testAction(
      getCurrentVersionsByPackage,
      { semverByPackage, relatedPackagesByPackage },
      { currentVersionsByPackage },
      done
    )
  })
})
