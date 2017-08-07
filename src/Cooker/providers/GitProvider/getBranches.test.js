/* eslint-env mocha */
import { config } from 'test-utils'
import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { getBranches } from './getBranches'

it('should return branches information', done => {
  const master = commits[commits.length - 1]
  getBranches(config.path).then(branches => {
    assert.deepEqual(
      branches,
      [
        {
          date: master.date,
          name: 'master',
          hash: master.hash,
        },
      ],
      done
    )
  })
})
