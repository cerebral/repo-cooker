/* eslint-env mocha */
import assert from 'assert'
import FunctionTree from 'function-tree'
import { MockedProvider } from '../test/mocks'
import { getLatestReleaseHash } from './actions'

it('cooks', () => {
  const ft = new FunctionTree([
    MockedProvider('npm', {}),
    MockedProvider('git', {
      extractCommit: () => 'foo',
      getShaListFromSha: () => 'bar',
      getLatestTagMatchingName: () => 'mip',
    }),
  ])

  ft.run([getLatestReleaseHash])
  assert(true)
})
