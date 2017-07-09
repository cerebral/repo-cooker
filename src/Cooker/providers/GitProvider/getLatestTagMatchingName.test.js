/* eslint-env mocha */
import { config } from 'test-utils'
import assert from 'test-utils/assert'
import { tags } from 'test-utils/commits'
import { getLatestTagMatchingName } from './getLatestTagMatchingName'

it('should return the latest tag matching given name', done => {
  getLatestTagMatchingName(config.path, 'release_').then(tag => {
    assert.deepEqual(tag, tags[tags.length - 1], done)
  })
})

it('should return null if no tag found', done => {
  getLatestTagMatchingName(config.path, 'notagwiththisname').then(tag => {
    assert.equal(tag, null, done)
  })
})
