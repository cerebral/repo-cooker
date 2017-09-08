/* eslint-env mocha */
import { testAction } from 'test-utils'
import { relatedPackagesByPackage } from './'

describe('relatedPackagesByPackage', () => {
  it('should get related packages for each package', done => {
    const noDeps = {
      dependencies: [],
      devDependencies: [],
      peerDependencies: [],
    }
    const relatedPackagesByPackageMap = {
      'repo-cooker-test': noDeps,
      '@repo-cooker-test/commis': {
        dependencies: ['@repo-cooker-test/poissonier'],
        devDependencies: [],
        peerDependencies: [],
      },
      '@repo-cooker-test/entremetier': noDeps,
      '@repo-cooker-test/executive-chef': noDeps,
      '@repo-cooker-test/pastry-chef': {
        dependencies: [],
        devDependencies: [],
        peerDependencies: ['@repo-cooker-test/sous-chef'],
      },
      '@repo-cooker-test/poissonier': {
        dependencies: [],
        devDependencies: ['@repo-cooker-test/entremetier'],
        peerDependencies: [],
      },
      '@repo-cooker-test/sous-chef': noDeps,
    }
    testAction(
      relatedPackagesByPackage,
      {},
      { relatedPackagesByPackage: relatedPackagesByPackageMap },
      done
    )
  })
})
