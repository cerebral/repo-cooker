/* eslint-env mocha */
import { config, testAction } from 'test-utils'
import { runNpmScript } from './'

it('should run npm script if exists', done => {
  const commands = [
    {
      cmd: 'npm',
      args: ['run', 'test', 'foo'],
      options: {
        cwd: config.packagesPaths['@repo-cooker-test/commis'],
      },
    },
  ]
  const testNpmScript = {
    'repo-cooker-test': false,
    '@repo-cooker-test/commis': [],
    '@repo-cooker-test/entremetier': false,
    '@repo-cooker-test/executive-chef': false,
    '@repo-cooker-test/pastry-chef': false,
    '@repo-cooker-test/poissonier': false,
    '@repo-cooker-test/sous-chef': false,
  }

  testAction(
    runNpmScript('test', ['foo']),
    {},
    { testNpmScript, commands },
    done
  )
})
