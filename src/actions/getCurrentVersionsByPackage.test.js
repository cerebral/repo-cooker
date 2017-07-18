/* eslint-env mocha */
import simple from 'simple-mock'
import { testAction } from 'test-utils'
import { mockNpmRegistry, versions } from 'test-utils/npm'
import { getCurrentVersionsByPackage } from './'

describe('getCurrentVersionsByPackage', () => {
  before(mockNpmRegistry)
  after(() => simple.restore())

  it('should get current versions for each package', done => {
    const semverByPackage = {
      '@repo-cooker-test/commis': 'minor',
      'repo-cooker-test': 'minor',
    }
    const currentVersionsByPackage = {
      '@repo-cooker-test/commis': versions['@repo-cooker-test/commis'],
      'repo-cooker-test': versions['repo-cooker-test'],
    }
    const relatedPackagesByPackage = {
      dependedOn: {
        '@repo-cooker-test/commis': [],
        'repo-cooker-test': [],
      },
      dependedBy: {
        '@repo-cooker-test/commis': [],
        'repo-cooker-test': [],
      },
    }
    testAction(
      getCurrentVersionsByPackage,
      { semverByPackage, relatedPackagesByPackage },
      { currentVersionsByPackage },
      done
    )
  })

  it('should get current versions for depending packages', done => {
    const semverByPackage = {
      '@repo-cooker-test/commis': 'minor',
    }
    const currentVersionsByPackage = {
      'repo-cooker-test': versions['repo-cooker-test'],
      '@repo-cooker-test/commis': versions['@repo-cooker-test/commis'],
    }
    const relatedPackagesByPackage = {
      dependedOn: {
        '@repo-cooker-test/commis': ['repo-cooker-test'],
        'repo-cooker-test': [],
      },
      dependedBy: {
        '@repo-cooker-test/commis': [],
        'repo-cooker-test': ['@repo-cooker-test/commis'],
      },
    }
    testAction(
      getCurrentVersionsByPackage,
      { semverByPackage, relatedPackagesByPackage },
      { currentVersionsByPackage },
      done
    )
  })

  it('should get current versions for depending by packages', done => {
    const semverByPackage = {
      '@repo-cooker-test/commis': 'minor',
    }
    const currentVersionsByPackage = {
      '@repo-cooker-test/commis': versions['@repo-cooker-test/commis'],
      'repo-cooker-test': versions['repo-cooker-test'],
    }
    const relatedPackagesByPackage = {
      dependedOn: {
        '@repo-cooker-test/commis': [],
        'repo-cooker-test': ['@repo-cooker-test/commis'],
      },
      dependedBy: {
        '@repo-cooker-test/commis': ['repo-cooker-test'],
        'repo-cooker-test': [],
      },
    }
    testAction(
      getCurrentVersionsByPackage,
      { semverByPackage, relatedPackagesByPackage },
      { currentVersionsByPackage },
      done
    )
  })
})
