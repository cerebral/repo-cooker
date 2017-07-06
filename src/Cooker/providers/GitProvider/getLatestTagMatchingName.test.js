/* eslint-env mocha */
import assert from 'test-utils/assert'
import { tags } from 'test-utils/commits'
import { getLatestTagMatchingName } from './getLatestTagMatchingName'

it('should return the latest tag matching given name', function(done) {
  getLatestTagMatchingName('test/repo', 'release_').then(tag => {
    assert.deepEqual(tag, tags[tags.length - 1], done)
  })
})

it('should return null if no tag found', function(done) {
  getLatestTagMatchingName('test/repo', 'notagwiththisname').then(tag => {
    assert.equal(tag, null, done)
  })
})
