/* eslint-env mocha */
import { testAction } from 'test-utils'
import { commits } from 'test-utils/commits'
import { getBranches } from './'

it('should list branches', done => {
  const master = commits[commits.length - 1]
  testAction(
    getBranches,
    {},
    {
      branches: [
        {
          date: master.date,
          name: 'next',
          hash: master.hash,
        },
      ],
    },
    done
  )
})
