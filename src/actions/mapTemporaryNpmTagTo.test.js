/* eslint-env mocha */
import { config, testAction } from 'test-utils'

import { mapTemporaryNpmTagTo } from './'

it('should replace temporary tag with given name', done => {
  const temporaryNpmTagByPackage = {
    '@repo-cooker-test/commis': 'releasing',
    '@repo-cooker-test/poissonier': 'releasing',
  }
  const foobarNpmTagByPackage = {
    '@repo-cooker-test/commis': 'foobar',
    '@repo-cooker-test/poissonier': 'foobar',
  }
  const newVersionByPackage = {
    '@repo-cooker-test/commis': '1.2.3',
    '@repo-cooker-test/poissonier': '4.5.6',
  }

  const commands = [
    {
      cmd: 'npm',
      args: ['dist-tag', 'add', '@repo-cooker-test/commis@1.2.3', 'foobar'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/commis'],
        pause: true,
      },
    },
    {
      cmd: 'npm',
      args: ['dist-tag', 'add', '@repo-cooker-test/poissonier@4.5.6', 'foobar'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/poissonier'],
        pause: true,
      },
    },
    {
      cmd: 'npm',
      args: ['dist-tag', 'rm', '@repo-cooker-test/commis', 'releasing'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/commis'],
      },
    },
    {
      cmd: 'npm',
      args: ['dist-tag', 'rm', '@repo-cooker-test/poissonier', 'releasing'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/poissonier'],
      },
    },
  ]

  testAction(
    mapTemporaryNpmTagTo('foobar'),
    { temporaryNpmTagByPackage, newVersionByPackage },
    { foobarNpmTagByPackage, commands },
    done
  )
})
