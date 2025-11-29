import { commits } from 'test-utils/commits'
import { getCurrentBranch } from './'
import { testAction } from 'test-utils'

it('should find the name of the current branch', (done) => {
  const commit = commits[commits.length - 1]
  testAction(
    getCurrentBranch,
    {},
    {
      branch: {
        date: commit.date,
        name: 'next',
        hash: commit.hash,
      },
    },
    done
  )
})
