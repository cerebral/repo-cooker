/* eslint-env mocha */
import assert from 'test-utils/assert'
import { config } from 'test-utils'
import { getRelatedPackages as getRelatedPackagesFactory } from './getRelatedPackages'

it('should get related packages by package', function(done) {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/commis').then(relatedPackages => {
    assert.deepEqual(
      relatedPackages,
      {
        dependencies: ['@repo-cooker-test/poissonier'],
        devDependencies: [],
        peerDependencies: [],
      },
      done
    )
  })
})

it('should read devDependencies', function(done) {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/poissonier').then(relatedPackages => {
    assert.deepEqual(
      relatedPackages,
      {
        dependencies: [],
        devDependencies: ['@repo-cooker-test/entremetier'],
        peerDependencies: [],
      },
      done
    )
  })
})

it('should read peerDependencies', function(done) {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/pastry-chef').then(relatedPackages => {
    assert.deepEqual(
      relatedPackages,
      {
        dependencies: [],
        devDependencies: [],
        peerDependencies: ['@repo-cooker-test/sous-chef'],
      },
      done
    )
  })
})
