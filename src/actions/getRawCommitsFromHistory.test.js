/* eslint-env mocha */
import { testAction } from 'test-utils'
import { getRawCommitsFromHistory } from './'
import { commits } from 'test-utils/commits'

it('should resolve commits hash to commit details', done => {
  const history = commits.map(c => c.hash)
  const rawCommits = commits
  testAction(getRawCommitsFromHistory, { history }, { rawCommits }, done)
})
