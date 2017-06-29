/* eslint-env mocha */
import assert from 'assert'
import { getShaListFromSha } from './getShaListFromSha'
import { commits } from '../../test/commits'

it('should return sha list up to master', function(done) {
  const sha = commits[0].sha
  getShaListFromSha('test/repo', sha)
    .then(list => {
      assert.deepEqual(list, commits.slice(1).map(commit => commit.sha))
      done()
    })
    .catch(console.log)
})
