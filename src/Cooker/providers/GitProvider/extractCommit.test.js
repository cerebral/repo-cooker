/* eslint-env mocha */
import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { extractCommit } from './extractCommit'

it('should extract commit information', function(done) {
  Promise.all(commits.map(commit => extractCommit('test/repo', commit.hash)))
    .then(list => list.sort((a, b) => (a.date < b.date ? -1 : 1)))
    .then(list => {
      assert.deepEqual(list, commits, done)
    })
})
