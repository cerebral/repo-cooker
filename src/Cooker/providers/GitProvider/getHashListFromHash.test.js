/* eslint-env mocha */
import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { getHashListFromHash } from './getHashListFromHash'

it('should return hash list up to master', function(done) {
  const hash = commits[0].hash
  getHashListFromHash('test/repo', hash).then(list => {
    assert.deepEqual(list, commits.slice(1).map(commit => commit.hash), done)
  })
})
