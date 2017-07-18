/* eslint-env mocha */
import simple from 'simple-mock'
import request from 'request'

export const versions = {
  'repo-cooker-test': '0.0.1',
  '@repo-cooker-test/commis': '2.3.2',
  '@repo-cooker-test/poissonier': '0.0.1',
}

const MOCKS = {
  'https://registry.npmjs.org/repo-cooker-test': {
    'dist-tags': { latest: versions['repo-cooker-test'] },
  },
  'https://registry.npmjs.org/@repo-cooker-test/commis': {
    'dist-tags': { latest: versions['@repo-cooker-test/commis'] },
  },
  'https://registry.npmjs.org/@repo-cooker-test/poissonier': {
    'dist-tags': { latest: versions['@repo-cooker-test/poissonier'] },
  },
}

export function mockNpmRegistry() {
  simple.mock(request, 'get').callFn((url, callback) => {
    const body = MOCKS[url]
    callback(null, null, JSON.stringify(body))
  })
}
