/* eslint-env mocha */
import { config, testAction } from 'test-utils'
import { mapTemporaryNpmTagToLatest } from './'

it('should replace temporary tag with latest', done => {
  const temporaryNpmTagByPackage = [
    { name: '@repo-cooker-test/commis', tag: 'releasing' },
    { name: '@repo-cooker-test/poissonier', tag: 'releasing' },
  ]
  const latestNpmTagByPackage = temporaryNpmTagByPackage.map(({ name }) => ({
    name,
    tag: 'latest',
  }))

  const commands = [
    {
      cmd: 'npm',
      args: ['dist-tag', 'add', '@repo-cooker-test/commis', 'latest'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/commis'],
      },
    },
    {
      cmd: 'npm',
      args: ['dist-tag', 'add', '@repo-cooker-test/poissonier', 'latest'],
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
    { temporaryNpmTagByPackage },
    { latestNpmTagByPackage, commands },
    done
  )
})
