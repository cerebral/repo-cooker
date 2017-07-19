/* eslint-env mocha */
import { join } from 'path'
import { config, testAction } from 'test-utils'
import { versions } from 'test-utils/npm'
import { writeVersionsToPackages } from './'

it('should write new versions to package.json', done => {
  const currentVersionByPackage = {
    '@repo-cooker-test/poissonnier': versions['@repo-cooker-test/poissonnier'],
  }
  const newVersionByPackage = {
    '@repo-cooker-test/commis': '4.5.6',
  }
  const commands = [
    {
      cmd: 'fs.writeFile',
      args: [
        join(config.packagesPaths['@repo-cooker-test/commis'], 'package.json'),
        '[data]',
        { encoding: 'utf8' },
      ],
    },
  ]
  testAction(
    writeVersionsToPackages,
    { newVersionByPackage, currentVersionByPackage },
    { commands },
    done
  )
})
