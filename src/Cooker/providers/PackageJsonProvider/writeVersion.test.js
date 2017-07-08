/* eslint-env mocha */
import assert from 'test-utils/assert'
import { config, runCommandMock } from 'test-utils'
import { join } from 'path'
import { writeVersion as writeVersionFactory } from './writeVersion'

it('should write version to package.json', function(done) {
  const runCommand = runCommandMock()
  const getPackagePath = packageName =>
    join(config.path, config.packagesPath, packageName)
  const writeVersion = writeVersionFactory({ runCommand, getPackagePath })
  writeVersion('@repo-cooker-test/commis', '9.9.5').then(() => {
    assert.deepEqual(
      runCommand.commands,
      [
        {
          cmd: 'fs.writeFile',
          args: [
            join(getPackagePath('@repo-cooker-test/commis'), 'package.json'),
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
