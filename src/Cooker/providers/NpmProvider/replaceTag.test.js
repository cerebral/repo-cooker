import { config, runCommandMock } from 'test-utils'

import assert from 'test-utils/assert'
import { replaceTag as replaceTagFactory } from './replaceTag'

it('should execute npm dist-tag add and remove', (done) => {
  const runCommand = runCommandMock()
  const replaceTag = replaceTagFactory({
    runCommand,
    packagesPaths: config.packagesPaths,
  })
  replaceTag('repo-cooker-test', '1.2.3', 'TAGA', 'TAGB').then(() => {
    assert.deepEqual(
      runCommand.commands,
      [
        {
          cmd: 'npm',
          args: ['dist-tag', 'add', 'repo-cooker-test@1.2.3', 'TAGB'],
          options: {
            cwd: config.packagesPaths['repo-cooker-test'],
            pause: true,
          },
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
