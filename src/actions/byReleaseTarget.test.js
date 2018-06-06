/* eslint-env mocha */
import { testAction } from 'test-utils'
import { byReleaseTarget } from './'

it('should choose branch from argv', done => {
  testAction(
    [
      byReleaseTarget,
      {
        bong: () => ({ success: true }),
        github: [],
      },
    ],
    { argv: ['--dry-run', '--release-to=bong'] },
    {
      success: true,
    },
    done
  )
})

it('should choose default branch', done => {
  testAction(
    [
      byReleaseTarget,
      {
        bong: [],
        github: () => ({ success: true }),
      },
    ],
    { argv: [] },
    {
      success: true,
    },
    done
  )
})
