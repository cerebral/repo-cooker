import { relatedPackagesByPackage } from './'
import { testAction } from 'test-utils'

describe('relatedPackagesByPackage', () => {
  it('should get related packages for each package', (done) => {
    const relatedPackagesByPackageMap = {
      '@repo-cooker-test/commis': ['@repo-cooker-test/poissonier'],
      '@repo-cooker-test/entremetier': [],
      '@repo-cooker-test/executive-chef': [],
      '@repo-cooker-test/pastry-chef': ['@repo-cooker-test/sous-chef'],
      '@repo-cooker-test/poissonier': [], // Only listed as dev dependency so no: ['@repo-cooker-test/entremetier'],
      '@repo-cooker-test/sous-chef': [],
      'repo-cooker-test': [],
    }
    testAction(
      relatedPackagesByPackage,
      {},
      { relatedPackagesByPackage: relatedPackagesByPackageMap },
      done
    )
  })
})
