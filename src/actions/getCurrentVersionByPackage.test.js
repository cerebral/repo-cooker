/* eslint-env mocha */
import { testAction } from 'test-utils'
import { mockNpmRegistry, versions } from 'test-utils/npm'
import { getCurrentVersionByPackage } from './'

describe('getCurrentVersionByPackage', () => {
  mockNpmRegistry()

  it('should get current versions for each package', done => {
    const semverByPackage = [
      { name: '@repo-cooker-test/commis' },
      { name: 'repo-cooker-test' },
    ]
    const currentVersionByPackage = semverByPackage.map(({ name }) => ({
      name,
      version: versions[name],
    }))
    testAction(
      getCurrentVersionByPackage,
      { semverByPackage },
      { currentVersionByPackage },
      done
    )
  })
})
