/* eslint-env jest */
import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { config } from 'test-utils'
import { getCurrentBranch } from './getCurrentBranch'

it('should return information on current branch', done => {
  const commit = commits[commits.length - 1]
  getCurrentBranch(config.path).then(branch => {
    assert.deepEqual(
      branch,
      {
        date: commit.date,
        name: 'next',
        hash: commit.hash,
      },
      done
    )
  })
})
