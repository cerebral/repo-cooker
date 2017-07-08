/* eslint-env mocha */
import assert from 'test-utils/assert'
import { runCommandMock } from 'test-utils'
import { publish as publishFactory } from './publish'

it('should execute npm publish command', function(done) {
  const runCommand = runCommandMock()
  const getPackagePath = packageName => `PACKAGES/${packageName}`
  const publish = publishFactory({ runCommand, getPackagePath })
  publish('repo-cooker-test', 'TAG').then(() => {
    assert.deepEqual(
      runCommand.commands,
      [
        {
          cmd: 'npm',
          args: ['publish', '--tag', 'TAG'],
          options: { cwd: 'PACKAGES/repo-cooker-test' },
        },
      ],
      done
    )
  })
})
