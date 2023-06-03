/* eslint-env jest */
import assert from 'test-utils/assert'
import { config } from 'test-utils'
import { getRelatedPackages as getRelatedPackagesFactory } from './getRelatedPackages'

it('should get related packages by package', done => {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/commis').then(relatedPackages => {
    assert.deepEqual(relatedPackages, ['@repo-cooker-test/poissonier'], done)
  })
})

it('should not use devDependencies', done => {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/poissonier').then(relatedPackages => {
    assert.deepEqual(relatedPackages, [], done)
  })
})

it('should get read peerDependencies', done => {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/pastry-chef').then(relatedPackages => {
    assert.deepEqual(relatedPackages, ['@repo-cooker-test/sous-chef'], done)
  })
})
