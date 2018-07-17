/* eslint-env mocha */
import { config, testAction } from 'test-utils'

import { publishUnderTemporaryNpmTag } from './'

it('should publish under temporary npm tag', function(done) {
  this.timeout(4000)
  const relatedPackagesByPackage = {
    '@repo-cooker-test/commis': [
      '@repo-cooker-test/poissonier',
      '@repo-cooker-test/sous-chef',
    ],
    '@repo-cooker-test/poissonier': [],
    '@repo-cooker-test/pastry-chef': ['@repo-cooker-test/sous-chef'],
    '@repo-cooker-test/executive-chef': [],
    '@repo-cooker-test/sous-chef': [],
  }
  const newVersionByPackage = {
    '@repo-cooker-test/commis': '3.0.0',
    '@repo-cooker-test/poissonier': '1.2.3',
    '@repo-cooker-test/entremetier': '1.2.3',
    '@repo-cooker-test/executive-chef': '2.4.0',
    '@repo-cooker-test/pastry-chef': '2.1.0',
    '@repo-cooker-test/sous-chef': '0.1.2',
  }
  const currentVersionByPackage = {
    '@repo-cooker-test/commis': '2.0.0',
    '@repo-cooker-test/poissonier': '1.2.0',
    '@repo-cooker-test/entremetier': '1.2.3',
    '@repo-cooker-test/executive-chef': '2.3.4',
    '@repo-cooker-test/pastry-chef': '2.0.0',
    '@repo-cooker-test/sous-chef': '0.1.2',
  }
  const temporaryNpmTagByPackage = {
    '@repo-cooker-test/commis': 'releasing',
    '@repo-cooker-test/poissonier': 'releasing',
    '@repo-cooker-test/executive-chef': 'releasing',
    '@repo-cooker-test/pastry-chef': 'releasing',
    // entremetier ignored due to unchanged version
    // sous-chef ignored due to unchanged version
  }

  const commands = [
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing', '--access', 'public'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/poissonier'],
        pause: true,
      },
    },
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing', '--access', 'public'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/executive-chef'],
        pause: true,
      },
    },
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing', '--access', 'public'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/pastry-chef'],
        pause: true,
      },
    },
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing', '--access', 'public'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/commis'],
        pause: true,
      },
    },
  ]
  testAction(
    publishUnderTemporaryNpmTag,
    { currentVersionByPackage, newVersionByPackage, relatedPackagesByPackage },
    { temporaryNpmTagByPackage, commands },
    done
  )
})
