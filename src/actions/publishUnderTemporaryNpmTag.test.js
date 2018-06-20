/* eslint-env mocha */
import { config, testAction } from 'test-utils'

import { publishUnderTemporaryNpmTag } from './'

it('should publish under temporary npm tag', function(done) {
  this.timeout(4000)
  const newVersionByPackage = {
    '@repo-cooker-test/commis': '3.0.0',
    '@repo-cooker-test/poissonier': '1.2.3',
    '@repo-cooker-test/entremetier': '1.2.3',
  }
  const currentVersionByPackage = {
    '@repo-cooker-test/commis': '2.0.0',
    '@repo-cooker-test/poissonier': '1.2.0',
    '@repo-cooker-test/entremetier': '1.2.3',
  }
  const temporaryNpmTagByPackage = {
    '@repo-cooker-test/commis': 'releasing',
    '@repo-cooker-test/poissonier': 'releasing',
    // entremetier ignored due to unchanged version
  }

  const commands = [
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing', '--access', 'public'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/commis'],
        pause: true,
      },
    },
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing', '--access', 'public'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/poissonier'],
        pause: true,
      },
    },
  ]
  testAction(
    publishUnderTemporaryNpmTag,
    { currentVersionByPackage, newVersionByPackage },
    { temporaryNpmTagByPackage, commands },
    done
  )
})
