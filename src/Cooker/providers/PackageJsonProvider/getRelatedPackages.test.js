/* eslint-env mocha */
import assert from 'test-utils/assert'
import { config } from 'test-utils'
import { getRelatedPackages as getRelatedPackagesFactory } from './getRelatedPackages'

it('should get related packages by package', function(done) {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/commis').then(relatedPackages => {
    assert.deepEqual(relatedPackages, ['@repo-cooker-test/poissonier'], done)
  })
})
