/* eslint-env jest */
import { byBranch } from './'
import { testAction } from 'test-utils'

it('should go down current branch', done => {
  testAction(
    [
      byBranch,
      {
        next: () => ({ success: true }),
        otherwise: [],
      },
    ],
    {},
    {
      success: true,
    },
    done
  )
})
