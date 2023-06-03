/* eslint-env jest */
import request from 'request'
import simple from 'simple-mock'

export const versions = {
  'repo-cooker-test': '0.0.1',
  '@repo-cooker-test/commis': '2.3.2',
  '@repo-cooker-test/entremetier': '1.3.4',
  '@repo-cooker-test/executive-chef': '3.1.7',
  '@repo-cooker-test/pastry-chef': '0.0.1',
  '@repo-cooker-test/poissonier': '1.0.0-123456',
  '@repo-cooker-test/sous-chef': '0.3.9',
}

const MOCKS = {
  'https://registry.npmjs.org/repo-cooker-test': {
    'dist-tags': { latest: versions['repo-cooker-test'] },
  },
  'https://registry.npmjs.org/@repo-cooker-test%2Fcommis': {
    'dist-tags': { latest: versions['@repo-cooker-test/commis'] },
  },
  'https://registry.npmjs.org/@repo-cooker-test%2Fentremetier': {
    'dist-tags': { latest: versions['@repo-cooker-test/entremetier'] },
  },
  'https://registry.npmjs.org/@repo-cooker-test%2Fexecutive-chef': {
    'dist-tags': { latest: versions['@repo-cooker-test/executive-chef'] },
  },
  'https://registry.npmjs.org/@repo-cooker-test%2Fpoissonier': {
    'dist-tags': { latest: versions['@repo-cooker-test/poissonier'] },
  },
  'https://registry.npmjs.org/@repo-cooker-test%2Fpastry-chef': {
    'dist-tags': { latest: versions['@repo-cooker-test/pastry-chef'] },
  },
  'https://registry.npmjs.org/@repo-cooker-test%2Fsous-chef': {},
}

export function mockNpmRegistry() {
  simple.mock(request, 'get').callFn((url, callback) => {
    if (url in MOCKS) {
      callback(null, null, JSON.stringify(MOCKS[url]))
    } else {
      throw new Error(`Npm url '${url}' needs a mock.`)
    }
  })
}
