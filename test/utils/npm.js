/* eslint-env mocha */
import simple from 'simple-mock'
import request from 'request'

export const versions = { 'repo-cooker-test': '0.6.0', '@repo-cooker-test/commis': '2.3.2' }

const MOCKS = {
  'https://registry.npmjs.org/repo-cooker-test': {
    'dist-tags': { latest: versions['repo-cooker-test'] },
  },
  'https://registry.npmjs.org/@repo-cooker-test/commis': {
    'dist-tags': { latest: versions['@repo-cooker-test/commis'] },
  },
}

export function mockNpm() {
  before(() => {
    simple.mock(request, 'get').callFn((path, callback) => {
      const body = MOCKS[path]
      callback(null, null, JSON.stringify(body))
    })
  })
  after(() => {
    simple.restore()
  })
}