/* eslint-env mocha */
import assert from 'test-utils/assert'
import { tags } from 'test-utils/commits'
import { getLatestTagMatchingName } from './getLatestTagMatchingName'

it('should return the latest tag matching given name', function(done) {
  getLatestTagMatchingName('test/repo', 'release_').then(tagName => {
    assert.equal(tagName, tags[tags.length - 1], done)
  })
})
