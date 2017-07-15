/* eslint-env mocha */
import { config, testAction } from 'test-utils'
import { publishUnderTemporaryNpmTag } from './'

it('should publish under temporary npm tag', done => {
  const newVersionsByPackage = [
    { name: '@repo-cooker-test/commis', version: '3.0.0' },
    { name: '@repo-cooker-test/poissonier', version: '1.2.3' },
  ]
  const temporaryNpmTagByPackage = newVersionsByPackage.map(({ name }) => ({
    name,
    tag: 'releasing',
  }))
  const commands = [
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/commis'],
      },
    },
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/poissonier'],
      },
    },
  ]
  testAction(
    publishUnderTemporaryNpmTag,
    { newVersionsByPackage },
    { temporaryNpmTagByPackage, commands },
    done
  )
})
