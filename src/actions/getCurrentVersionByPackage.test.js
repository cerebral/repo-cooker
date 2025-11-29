import { mockNpmRegistry, versions } from 'test-utils/npm'

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { getCurrentVersionByPackage } from './'
import { testAction } from 'test-utils'

describe('getCurrentVersionByPackage', () => {
  let mock

  beforeAll(() => {
    mock = new MockAdapter(axios)
    mockNpmRegistry(mock)
  })
  afterAll(() => {
    mock.restore()
  })

  it('should get current version for each package', (done) => {
    const semverByPackage = {
      '@repo-cooker-test/commis': 'minor',
      'repo-cooker-test': 'minor',
    }
    const currentVersionByPackage = {
      '@repo-cooker-test/commis': versions['@repo-cooker-test/commis'],
      '@repo-cooker-test/poissonier': null,
      'repo-cooker-test': versions['repo-cooker-test'],
    }
    const relatedPackagesByPackage = {
      'repo-cooker-test': [],
      '@repo-cooker-test/commis': ['@repo-cooker-test/poissonier'],
    }

    testAction(
      getCurrentVersionByPackage,
      { semverByPackage, relatedPackagesByPackage },
      { currentVersionByPackage },
      done
    )
  })

  it('should default to null when no NPM release available', (done) => {
    const semverByPackage = {
      '@repo-cooker-test/sous-chef': 'minor',
    }
    const currentVersionByPackage = {
      '@repo-cooker-test/sous-chef': null,
    }
    const relatedPackagesByPackage = {
      '@repo-cooker-test/sous-chef': [],
    }

    testAction(
      getCurrentVersionByPackage,
      { semverByPackage, relatedPackagesByPackage },
      { currentVersionByPackage },
      done
    )
  })
})
