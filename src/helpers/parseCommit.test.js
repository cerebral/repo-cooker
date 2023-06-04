/* eslint-env jest */
import { commits, parsedCommits } from 'test-utils/commits'

import assert from 'test-utils/assert'
import { parseCommit } from './parseCommit'

it('should parse commits for breaking changes, issues, scope, etc', done => {
  assert.deepEqual(commits.map(parseCommit), parsedCommits, done)
})
