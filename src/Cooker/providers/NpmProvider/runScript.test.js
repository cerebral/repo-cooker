/* eslint-env mocha */
import assert from 'test-utils/assert'
import { config, runCommandMock } from 'test-utils'
import { runScript as runScriptFactory } from './runScript'

it('should execute script in package', done => {
  const runCommand = runCommandMock()
  const runScript = runScriptFactory({
    runCommand,
    packagesPaths: config.packagesPaths,
  })
  runScript('@repo-cooker-test/commis', 'test', ['extra argument']).then(() => {
    assert.deepEqual(
      runCommand.commands,
      [
        {
          cmd: 'npm',
          args: ['run', 'test', 'extra argument'],
          options: { cwd: config.packagesPaths['@repo-cooker-test/commis'] },
        },
      ],
      done
    )
  })
})
