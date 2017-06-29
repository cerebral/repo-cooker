/* eslint-env mocha */
import assert from '../../test/assert'
import { commits } from '../../test/commits'
import { getShaListFromSha } from './getShaListFromSha'

it('should return sha list up to master', function(done) {
  const sha = commits[0].sha
  getShaListFromSha('test/repo', sha).then(list => {
    assert.deepEqual(list, commits.slice(1).map(commit => commit.sha), done)
  })
})
