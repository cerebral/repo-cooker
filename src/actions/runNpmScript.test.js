/* eslint-env jest */
import { config, testAction } from 'test-utils'

import { props } from 'function-tree/tags'
import { runNpmScript } from './'

const commands = [
  {
    cmd: 'npm',
    args: ['run', 'test', 'foo'],
    options: {
      cwd: config.packagesPaths['@repo-cooker-test/commis'],
    },
  },
  {
    cmd: 'npm',
    args: ['run', 'test', 'foo'],
    options: {
      cwd: config.packagesPaths['@repo-cooker-test/pastry-chef'],
    },
  },
]

const testNpmScript = {
  '@repo-cooker-test/commis': { pass: true, output: 'mock command' },
  '@repo-cooker-test/entremetier': false,
  '@repo-cooker-test/executive-chef': false,
  '@repo-cooker-test/pastry-chef': {
    pass: true,
    output: 'mock command',
  },
  '@repo-cooker-test/poissonier': false,
  '@repo-cooker-test/sous-chef': false,
  'repo-cooker-test': false,
}

it('should run npm script if exists', done => {
  testAction(
    runNpmScript('test', ['foo']),
    {},
    { testNpmScript, commands },
    done
  )
})

it('should run npm script tag', done => {
  testAction(
    runNpmScript(props`npmScript`, ['foo']),
    { npmScript: 'test' },
    { testNpmScript, commands },
    done
  )
})
