import { commits } from 'test-utils/commits'
import { getRawCommitsFromHistory } from './'
import { testAction } from 'test-utils'

it('should resolve commits hash to commit details', (done) => {
  const history = commits.map((c) => c.hash)
  const rawCommits = commits
  testAction(getRawCommitsFromHistory, { history }, { rawCommits }, done)
})
