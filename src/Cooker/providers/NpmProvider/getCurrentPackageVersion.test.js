/* eslint-env mocha */
import simple from 'simple-mock'
import assert from 'test-utils/assert'
import { mockNpmRegistry, versions } from 'test-utils/npm'
import { getCurrentPackageVersion } from './getCurrentPackageVersion'

describe('getCurrentPackageVersion', () => {
  before(mockNpmRegistry)
  after(() => simple.restore())

  it('should return the "latest" dist-tag version', function(done) {
    getCurrentPackageVersion('repo-cooker-test').then(version => {
      assert.equal(version, versions['repo-cooker-test'], done)
    })
  })

  it('should return null when no version available', function(done) {
    getCurrentPackageVersion('@repo-cooker-test/sous-chef').then(version => {
      assert.equal(version, null, done)
    })
  })
})
