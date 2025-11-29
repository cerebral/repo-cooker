import { mockNpmRegistry, versions } from 'test-utils/npm'

import MockAdapter from 'axios-mock-adapter'
import assert from 'test-utils/assert'
import axios from 'axios'
import { getCurrentPackageVersion } from './getCurrentPackageVersion'

describe('getCurrentPackageVersion', () => {
  let mock

  beforeAll(() => {
    mock = new MockAdapter(axios)
    mockNpmRegistry(mock)
  })
  afterAll(() => {
    mock.restore()
  })

  it('should return the "latest" dist-tag version', (done) => {
    getCurrentPackageVersion('repo-cooker-test').then((version) => {
      assert.equal(version, versions['repo-cooker-test'], done)
    })
  })

  it('should return null when no version available', (done) => {
    getCurrentPackageVersion('@repo-cooker-test/sous-chef').then((version) => {
      assert.equal(version, null, done)
    })
  })

  it('should return null when latest in not a semver version', (done) => {
    getCurrentPackageVersion('@repo-cooker-test/poissonier').then((version) => {
      assert.equal(version, null, done)
    })
  })
})
