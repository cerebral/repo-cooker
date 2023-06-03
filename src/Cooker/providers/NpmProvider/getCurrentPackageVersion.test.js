/* eslint-env jest */
import { mockNpmRegistry, versions } from 'test-utils/npm'

import assert from 'test-utils/assert'
import { getCurrentPackageVersion } from './getCurrentPackageVersion'
import simple from 'simple-mock'

describe('getCurrentPackageVersion', () => {
  beforeAll(mockNpmRegistry)
  afterAll(() => simple.restore())

  it('should return the "latest" dist-tag version', done => {
    getCurrentPackageVersion('repo-cooker-test').then(version => {
      assert.equal(version, versions['repo-cooker-test'], done)
    })
  })

  it('should return null when no version available', done => {
    getCurrentPackageVersion('@repo-cooker-test/sous-chef').then(version => {
      assert.equal(version, null, done)
    })
  })

  it(
    'should return null when latest in not a semver version',
    done => {
      getCurrentPackageVersion('@repo-cooker-test/poissonier').then(version => {
        assert.equal(version, null, done)
      })
    }
  )
})
