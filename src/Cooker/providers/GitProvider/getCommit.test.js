/* eslint-env mocha */
import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { getCommit } from './getCommit'

it('should get commit data', function(done) {
  Promise.all(commits.map(commit => getCommit('test/repo', commit.hash)))
    .then(list => list.sort((a, b) => (a.date < b.date ? -1 : 1)))
    .then(list => {
      assert.deepEqual(list, commits, done)
    })
})
