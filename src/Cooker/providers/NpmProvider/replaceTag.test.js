/* eslint-env mocha */
import assert from 'test-utils/assert'
import { config, runCommandMock } from 'test-utils'
import { replaceTag as replaceTagFactory } from './replaceTag'

it('should execute npm dist-tag add and remove', function(done) {
  const runCommand = runCommandMock()
  const replaceTag = replaceTagFactory({
    runCommand,
    packagesPaths: config.packagesPaths,
  })
  replaceTag('repo-cooker-test', 'TAGA', 'TAGB').then(() => {
    assert.deepEqual(
      runCommand.commands,
      [
        {
          cmd: 'npm',
          args: ['dist-tag', 'add', 'repo-cooker-test', 'TAGB'],
          options: { cwd: config.packagesPaths['repo-cooker-test'] },
        },
        {
          cmd: 'npm',
          args: ['dist-tag', 'rm', 'repo-cooker-test', 'TAGA'],
          options: { cwd: config.packagesPaths['repo-cooker-test'] },
        },
      ],
      done
    )
  })
})
