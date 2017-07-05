/* eslint-env mocha */
import { testAction } from 'test-utils'
import { parseCommits } from './'
import {
  commits as allCommits,
  parsedCommits as allParsedCommits,
} from 'test-utils/commits'

it('should resolve commits hash to commit details', done => {
  const commits = allCommits.slice(allCommits.length - 3)
  const parsedCommits = allParsedCommits.slice(allParsedCommits.length - 3)
  testAction(parseCommits, { commits }, { parsedCommits }, done)
})
