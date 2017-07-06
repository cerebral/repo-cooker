/* eslint-env mocha */
import { testAction } from 'test-utils'
import { getLatestReleaseHash } from './'
import { tags } from 'test-utils/commits'

it('should find last tag matching release_', done => {
  const hash = tags[tags.length - 1].hash
  testAction(getLatestReleaseHash, {}, { hash }, done)
})
