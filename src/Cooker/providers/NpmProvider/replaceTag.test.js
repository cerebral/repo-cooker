/* eslint-env mocha */
import assert from 'test-utils/assert'
import { testRun } from 'test-utils'
import { replaceTag as replaceTagFactory } from './replaceTag'

it('should execute npm dist-tag add and remove', function(done) {
  const runCommand = testRun()
  const getPackagePath = (packageName) => `PACKAGES/${packageName}`
  const replaceTag = replaceTagFactory({runCommand, getPackagePath })
  replaceTag('repo-cooker-test', 'TAGA', 'TAGB').then(() => {
    assert.deepEqual(runCommand.commands, [
      'npm dist-tag add repo-cooker-test TAGB {"cwd":"PACKAGES/repo-cooker-test"}',
      'npm dist-tag rm repo-cooker-test TAGA {"cwd":"PACKAGES/repo-cooker-test"}'
      ], done)
  })
})
