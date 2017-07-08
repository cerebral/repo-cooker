/* eslint-env mocha */
import assert from 'test-utils/assert'
import { testRun } from 'test-utils'
import { publish as publishFactory } from './publish'

it('should execute npm publish command', function(done) {
  const runCommand = testRun()
  const getPackagePath = packageName => `PACKAGES/${packageName}`
  const publish = publishFactory({ runCommand, getPackagePath })
  publish('repo-cooker-test', 'TAG').then(() => {
    assert.deepEqual(
      runCommand.commands,
      ['npm publish --tag TAG {"cwd":"PACKAGES/repo-cooker-test"}'],
      done
    )
  })
})
