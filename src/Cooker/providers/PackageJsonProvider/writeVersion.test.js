/* eslint-env mocha */
import assert from 'test-utils/assert'
import { config, runCommandMock } from 'test-utils'
import { join } from 'path'
import { writeVersion as writeVersionFactory } from './writeVersion'

it('should write version to package.json', function(done) {
  const runCommand = runCommandMock()
  const writeVersion = writeVersionFactory({
    runCommand,
    packagesPaths: config.packagesPaths,
  })
  writeVersion('@repo-cooker-test/commis', '9.9.5').then(() => {
    assert.deepEqual(
      runCommand.commands,
      [
        {
          cmd: 'fs.writeFile',
          args: [
            join(
              config.packagesPaths['@repo-cooker-test/commis'],
              'package.json'
            ),
            '[data]',
            {
              encoding: 'utf8',
            },
          ],
        },
      ],
      done
    )
  })
})
