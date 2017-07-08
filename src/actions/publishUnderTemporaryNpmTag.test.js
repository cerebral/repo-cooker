/* eslint-env mocha */
import { testAction } from 'test-utils'
import { publishUnderTemporaryNpmTag } from './'

it('should publish under temporary npm tag', done => {
  const newVersionByPackage = [
    { name: '@repo-cooker-test/commis', version: '3.0.0' },
    { name: '@repo-cooker-test/poissonier', version: '1.2.3' },
  ]
  const temporaryNpmTagByPackage = newVersionByPackage.map(({ name }) => ({
    name,
    tag: 'releasing',
  }))
  const commands = [
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing'],
      options: {
        cwd:
          '/Users/gaspard/git/repo-cooker/test/repo/packages/node_modules/@repo-cooker-test/commis',
      },
    },
    {
      cmd: 'npm',
      args: ['publish', '--tag', 'releasing'],
      options: {
        cwd:
          '/Users/gaspard/git/repo-cooker/test/repo/packages/node_modules/@repo-cooker-test/poissonier',
      },
    },
  ]
  testAction(
    publishUnderTemporaryNpmTag,
    { newVersionByPackage },
    { temporaryNpmTagByPackage, commands },
    done
  )
})
