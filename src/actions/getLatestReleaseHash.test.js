/* eslint-env mocha */
import nodegit from 'nodegit'
import simple from 'simple-mock'
import { testAction } from 'test-utils'
import { getLatestReleaseHash } from './'
import { tags } from 'test-utils/commits'

it('should find last tag matching release_', done => {
  const hash = tags[tags.length - 1].hash
  testAction(getLatestReleaseHash, {}, { hash }, done)
})

describe('getLatestReleaseHash', () => {
  before(() => {
    simple.mock(nodegit.Tag, 'list').resolveWith([])
  })
  after(() => {
    simple.restore()
  })

  it("should return 'Big Bang' for no previous release", done => {
    testAction(getLatestReleaseHash, {}, { hash: 'Big Bang' }, done)
  })
})
