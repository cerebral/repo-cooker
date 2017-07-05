/* eslint-env mocha */
import { testAction } from 'test-utils'
import { getHistoryFromHash } from './'
import { commits } from 'test-utils/commits'

it('should find last tag matching release_', done => {
  const hash = commits[commits.length - 3].hash
  // list does not include hash
  const list = commits.slice(commits.length - 2).map(c => c.hash) 
  testAction(getHistoryFromHash, { hash }, { commits: list }, done)
})
