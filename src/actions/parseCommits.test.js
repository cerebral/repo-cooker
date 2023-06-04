/* eslint-env jest */
import { commits as allCommits, parsedCommits } from 'test-utils/commits'

import { parseCommits } from './'
import { testAction } from 'test-utils'

it('should resolve commits hash to commit details', done => {
  const rawCommits = allCommits.slice(allCommits.length - 3)
  const commits = parsedCommits.slice(parsedCommits.length - 3)
  testAction(parseCommits, { rawCommits }, { commits }, done)
})
