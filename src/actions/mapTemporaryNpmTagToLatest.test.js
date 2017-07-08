/* eslint-env mocha */
import { join } from 'path'
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
  const getPackagePath = packageName =>
    join(config.path, config.packagesPath, packageName)

  const commands = [
    {
      cmd: 'npm',
      args: ['dist-tag', 'add', '@repo-cooker-test/commis', 'latest'],
      options: {
        cwd: getPackagePath('@repo-cooker-test/commis'),
      },
    },
    {
      cmd: 'npm',
      args: ['dist-tag', 'add', '@repo-cooker-test/poissonier', 'latest'],
      options: {
        cwd: getPackagePath('@repo-cooker-test/poissonier'),
      },
    },
    {
      cmd: 'npm',
      args: ['dist-tag', 'rm', '@repo-cooker-test/commis', 'releasing'],
      options: {
        cwd: getPackagePath('@repo-cooker-test/commis'),
      },
    },
    {
      cmd: 'npm',
      args: ['dist-tag', 'rm', '@repo-cooker-test/poissonier', 'releasing'],
      options: {
        cwd: getPackagePath('@repo-cooker-test/poissonier'),
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
