import assert from 'test-utils/assert'
import { config } from 'test-utils'
import { getLatestTagMatchingName } from './getLatestTagMatchingName'
import { tags } from 'test-utils/commits'

it('should return the latest tag matching given name', (done) => {
  getLatestTagMatchingName(config.path, 'release_').then((tag) => {
    assert.deepEqual(tag, tags[tags.length - 1], done)
  })
})

it('should return null if no tag found', (done) => {
  getLatestTagMatchingName(config.path, 'notagwiththisname').then((tag) => {
    assert.equal(tag, null, done)
  })
})
