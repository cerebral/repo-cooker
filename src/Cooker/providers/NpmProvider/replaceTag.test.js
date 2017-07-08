/* eslint-env mocha */
import assert from 'test-utils/assert'
import { runCommandMock } from 'test-utils'
import { replaceTag as replaceTagFactory } from './replaceTag'

it('should execute npm dist-tag add and remove', function(done) {
  const runCommand = runCommandMock()
  const getPackagePath = packageName => `PACKAGES/${packageName}`
  const replaceTag = replaceTagFactory({ runCommand, getPackagePath })
  replaceTag('repo-cooker-test', 'TAGA', 'TAGB').then(() => {
    assert.deepEqual(
      runCommand.commands,
      [
        {
          cmd: 'npm',
          args: ['dist-tag', 'add', 'repo-cooker-test', 'TAGB'],
          options: { cwd: 'PACKAGES/repo-cooker-test' },
        },
        {
          cmd: 'npm',
          args: ['dist-tag', 'rm', 'repo-cooker-test', 'TAGA'],
          options: { cwd: 'PACKAGES/repo-cooker-test' },
        },
      ],
      done
    )
  })
})
