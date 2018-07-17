/* eslint-env mocha */
import { props } from 'function-tree/tags'
import { config, testAction } from 'test-utils'
import { runNpmScriptByRelatedPackage } from './'

const commands = [
  {
    cmd: 'npm',
    args: ['run', 'test', 'foo'],
    options: {
      cwd: config.packagesPaths['@repo-cooker-test/executive-chef'],
    },
  },
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

const relatedPackagesByPackage = {
  '@repo-cooker-test/commis': [
    '@repo-cooker-test/poissonier',
    '@repo-cooker-test/sous-chef',
  ],
  '@repo-cooker-test/poissonier': [],
  '@repo-cooker-test/pastry-chef': ['@repo-cooker-test/sous-chef'],
  '@repo-cooker-test/executive-chef': [],
  '@repo-cooker-test/sous-chef': [],
  '@repo-cooker-test/entremetier': [],
  'repo-cooker-test': [],
}

const testNpmScript = {
  '@repo-cooker-test/poissonier': false,
  '@repo-cooker-test/executive-chef': { pass: true, output: 'mock command' },
  '@repo-cooker-test/sous-chef': false,
  '@repo-cooker-test/entremetier': false,
  'repo-cooker-test': false,
  '@repo-cooker-test/commis': { pass: true, output: 'mock command' },
  '@repo-cooker-test/pastry-chef': {
    pass: true,
    output: 'mock command',
  },
}

it('should run npm script by related packages if exists', done => {
  testAction(
    runNpmScriptByRelatedPackage('test', ['foo']),
    { relatedPackagesByPackage },
    { testNpmScript, commands },
    done
  )
})

it('should run npm script by related packages tag', done => {
  testAction(
    runNpmScriptByRelatedPackage(props`npmScript`, ['foo']),
    { npmScript: 'test', relatedPackagesByPackage },
    { testNpmScript, commands },
    done
  )
})
