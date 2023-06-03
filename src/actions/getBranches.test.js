/* eslint-env jest */
import { commits } from 'test-utils/commits'
import { getBranches } from './'
import { testAction } from 'test-utils'

it('should list branches', done => {
  const commit = commits[commits.length - 1]
  testAction(
    getBranches,
    {},
    {
      branches: [
        {
          date: commit.date,
          name: 'next',
          hash: commit.hash,
        },
      ],
    },
    done
  )
})
