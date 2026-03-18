import { config, testAction } from 'test-utils'

import { publishUnderFinalNpmTag } from '.'

it('should publish under temporary npm tag', (done) => {
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
  const canaryNpmTagByPackage = {
    '@repo-cooker-test/commis': 'canary',
    '@repo-cooker-test/poissonier': 'canary',
    // entremetier ignored due to unchanged version
  }

  const commands = [
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'canary', '--access', 'public'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/commis'],
        pause: true,
      },
    },
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'canary', '--access', 'public'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/poissonier'],
        pause: true,
      },
    },
  ]
  testAction(
    publishUnderFinalNpmTag('canary'),
    { currentVersionByPackage, newVersionByPackage },
    { canaryNpmTagByPackage, commands },
    done
  )
})
