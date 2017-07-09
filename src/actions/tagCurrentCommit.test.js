/* eslint-env mocha */
import simple from 'simple-mock'
import { config, testAction } from 'test-utils'
import { tagCurrentCommit } from './'

const isoString = '2017-07-09T19:06:31.620Z'

describe('tagCurrentCommit', () => {
  before(() => {
    simple.mock(Date.prototype, 'toISOString').returnWith(isoString)
  })
  after(() => {
    simple.restore()
  })
  it('should tag current commit', done => {
    const commands = [
      {
        cmd: 'createTagForCommit',
        args: [config.path, 'release_2017-07-09_1906', '', 'HEAD'],
      },
    ]
    testAction(tagCurrentCommit, {}, { commands }, done)
  })
})
