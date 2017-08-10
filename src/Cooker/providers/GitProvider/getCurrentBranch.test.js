/* eslint-env mocha */
import { config } from 'test-utils'
import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { getCurrentBranch } from './getCurrentBranch'

it('should return information on current branch', done => {
  const master = commits[commits.length - 1]
  getCurrentBranch(config.path).then(branch => {
    assert.deepEqual(
      branch,
      {
        date: master.date,
        name: 'next',
        hash: master.hash,
      },
      done
    )
  })
})
