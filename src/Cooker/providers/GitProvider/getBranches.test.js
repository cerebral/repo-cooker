/* eslint-env jest */
import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { config } from 'test-utils'
import { getBranches } from './getBranches'

it('should return branches information', done => {
  const commit = commits[commits.length - 1]
  getBranches(config.path).then(branches => {
    assert.deepEqual(
      branches,
      [
        {
          date: commit.date,
          name: 'next',
          hash: commit.hash,
        },
      ],
      done
    )
  })
})
