/* eslint-env mocha */
import assert from 'test-utils/assert'
import { commits, parsedCommits } from 'test-utils/commits'
import { parseCommit } from './parseCommit'

it('should parse commits for breaking changes, issues, scope, etc', function (done) {
  assert.deepEqual(commits.map(parseCommit), parsedCommits, done)
})
