/* eslint-env mocha */
import { testAction } from 'test-utils'
import { getCommitsFromHistory } from './'
import { commits as allCommits } from 'test-utils/commits'

it('should resolve commits hash to commit details', done => {
  const commits = allCommits.slice(allCommits.length - 3)
  const history = commits.map(c => c.hash)
  testAction(getCommitsFromHistory, { history }, { commits }, done)
})
