/* eslint-env mocha */
import { join } from 'path'
import { config, testAction } from 'test-utils'
import { writeVersionToPackages } from './'

it('should write new versions to package.json', done => {
  const newVersionByPackage = [
    { name: '@repo-cooker-test/commis', version: '4.5.6' },
  ]
  const commands = [
    {
      cmd: 'fs.writeFile',
      args: [
        join(
          config.path,
          config.packagesPath,
          '@repo-cooker-test/commis',
          'package.json'
        ),
        '[data]',
        { encoding: 'utf8' },
      ],
    },
  ]
  testAction(
    writeVersionToPackages,
    { newVersionByPackage },
    { commands },
    done
  )
})
