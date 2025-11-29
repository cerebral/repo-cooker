import { config, runCommandMock } from 'test-utils'

import assert from 'test-utils/assert'
import { join } from '../../../helpers/path'
import { write as writeFactory } from './write'

it('should write to package.json', (done) => {
  const runCommand = runCommandMock()
  const write = writeFactory({
    runCommand,
    packagesPaths: config.packagesPaths,
  })
  write('@repo-cooker-test/commis', () => ({ foo: 'bar' })).then(() => {
    assert.deepEqual(
      runCommand.commands,
      [
        {
          cmd: 'writeFile',
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
