/* eslint-env mocha */
import assert from 'assert'
import { extractCommit } from './extractCommit'
import { commits } from '../../test/commits'

function deepEqual(a, b) {
  assert.equal(JSON.stringify(a, null, 2), JSON.stringify(b, null, 2))
}

it('should extract commit information', function(done) {
  Promise.all(commits.map(commit => extractCommit('test/repo', commit.sha)))
    .then(list => list.sort((a, b) => (a.date < b.date ? -1 : 1)))
    .then(list => {
      // console.log(JSON.stringify(list, null, 2))
      try {
        deepEqual(list, commits)
        done()
      } catch (err) {
        done (err)
      }
    })
    .catch(console.log)
})
