/* eslint-env mocha */
import assert from 'test-utils/assert'
import { mockNpmRegistry, versions } from 'test-utils/npm'
import { getCurrentPackageVersion } from './getCurrentPackageVersion'

describe('getCurrentPackageVersion', () => {
  mockNpmRegistry()

  it('should return the list of released versions', function(done) {
    getCurrentPackageVersion('repo-cooker-test').then(version => {
      assert.equal(version, versions['repo-cooker-test'], done)
    })
  })
})
