/* eslint-env mocha */
import { testAction } from 'test-utils'
import { relatedPackagesByPackage } from './'

describe('relatedPackagesByPackage', () => {
  it('should get related packages for each package', done => {
    const relatedPackagesByPackageMap = {
      dependedOn: {
        'repo-cooker-test': [],
        '@repo-cooker-test/commis': ['@repo-cooker-test/poissonier'],
        '@repo-cooker-test/entremetier': [],
        '@repo-cooker-test/executive-chef': [],
        '@repo-cooker-test/pastry-chef': [],
        '@repo-cooker-test/poissonier': [],
        '@repo-cooker-test/sous-chef': [],
      },
      dependedBy: {
        'repo-cooker-test': [],
        '@repo-cooker-test/commis': [],
        '@repo-cooker-test/poissonier': ['@repo-cooker-test/commis'],
        '@repo-cooker-test/entremetier': [],
        '@repo-cooker-test/executive-chef': [],
        '@repo-cooker-test/pastry-chef': [],
        '@repo-cooker-test/sous-chef': [],
      },
    }
    testAction(
      relatedPackagesByPackage,
      {},
      { relatedPackagesByPackage: relatedPackagesByPackageMap },
      done
    )
  })
})
