/* eslint-env mocha */
import assert from '../../../../test/assert'
import { extractCommit } from './extractCommit'
import { commits } from '../../../../test/commits'

it('should extract commit information', function(done) {
  Promise.all(commits.map(commit => extractCommit('test/repo', commit.sha)))
    .then(list => list.sort((a, b) => (a.date < b.date ? -1 : 1)))
    .then(list => {
      assert.deepEqual(list, commits, done)
    })
})
