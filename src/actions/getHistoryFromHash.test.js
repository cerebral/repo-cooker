import { commits } from 'test-utils/commits'
import { getHistoryFromHash } from './'
import { testAction } from 'test-utils'

it('should find commits hash since provided hash', (done) => {
  const hash = commits[commits.length - 4].hash
  // list does not include hash
  const history = commits.slice(commits.length - 3).map((c) => c.hash)
  testAction(getHistoryFromHash, { hash }, { history }, done)
})
