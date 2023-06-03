/* eslint-env jest */
import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { config } from 'test-utils'
import { getCommit } from './getCommit'
import { runAll } from '../../../helpers/runAll'

it('should get commit data', done => {
  runAll(commits.map(commit => getCommit(config.path, commit.hash)))
    .then(list => list.sort((a, b) => (a.date < b.date ? -1 : 1)))
    .then(list => {
      assert.deepEqual(list, commits, done)
    })
})
