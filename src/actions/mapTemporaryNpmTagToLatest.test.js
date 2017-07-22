/* eslint-env mocha */
import { config, testAction } from 'test-utils'
import { mapTemporaryNpmTagToLatest } from './'

it('should replace temporary tag with latest', done => {
  const temporaryNpmTagByPackage = {
    '@repo-cooker-test/commis': 'releasing',
    '@repo-cooker-test/poissonier': 'releasing',
  }
  const latestNpmTagByPackage = {
    '@repo-cooker-test/commis': 'latest',
    '@repo-cooker-test/poissonier': 'latest',
  }
  const newVersionByPackage = {
    '@repo-cooker-test/commis': '1.2.3',
    '@repo-cooker-test/poissonier': '4.5.6',
  }

  const commands = [
    {
      cmd: 'npm',
      args: ['dist-tag', 'add', '@repo-cooker-test/commis@1.2.3', 'latest'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/commis'],
      },
    },
    {
      cmd: 'npm',
      args: ['dist-tag', 'add', '@repo-cooker-test/poissonier@4.5.6', 'latest'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/poissonier'],
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
    mapTemporaryNpmTagToLatest,
    { temporaryNpmTagByPackage, newVersionByPackage },
    { latestNpmTagByPackage, commands },
    done
  )
})
