/* eslint-env mocha */
import assert from 'test-utils/assert'
import { DryRun, config } from 'test-utils'
import { join } from 'path'
import { writeVersion as writeVersionFactory } from './writeVersion'

it('should write version to package.json', function(done) {
  const runCommand = DryRun()
  const getPackagePath = packageName => join(config.path, config.packagesPath, packageName )
  const writeVersion = writeVersionFactory({ runCommand, getPackagePath })
  writeVersion('@repo-cooker-test/commis', '9.9.5').then(() => {
    assert.deepEqual(
      runCommand.commands,
      [
        '[fs.writeFile] ...ooker-test/commis/package.json ...s": {},\n  "version": "9.9.5"\n} {"encoding":"utf8"}'
      ],
      done
    )
  })
})
