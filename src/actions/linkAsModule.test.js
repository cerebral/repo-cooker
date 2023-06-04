/* eslint-env jest */
import { linkAsModule } from './'
import { resolve } from '../helpers/path'
import { testAction } from 'test-utils'

it('should link as modules', done => {
  jest.setTimeout(4000)
  const packagesPaths = {
    '@repo-cooker-test/commis': '/foo/bar/baz/@repo-cooker-test/commis',
    '@repo-cooker-test/entremetier':
      '/foo/bar/baz/@repo-cooker-test/entremetier',
    '@repo-cooker-test/executive-chef':
      '/foo/bar/baz/@repo-cooker-test/executive-chef',
    '@repo-cooker-test/pastry-chef':
      '/foo/bar/baz/@repo-cooker-test/pastry-chef',
    '@repo-cooker-test/poissonier': '/foo/bar/baz/@repo-cooker-test/poissonier',
    '@repo-cooker-test/sous-chef': '/foo/bar/baz/@repo-cooker-test/sous-chef',
    'repo-cooker-test': '/foo/bar/repo-cooker-test',
  }
  const linkResults = {
    '@repo-cooker-test/commis': 'mock command',
    '@repo-cooker-test/entremetier': 'mock command',
    '@repo-cooker-test/executive-chef': 'mock command',
    '@repo-cooker-test/pastry-chef': 'mock command',
    '@repo-cooker-test/poissonier': 'mock command',
    '@repo-cooker-test/sous-chef': 'mock command',
    'repo-cooker-test': 'mock command',
  }

  const commands = [
    { cmd: 'mkdirSync', args: ['/foo/bar/node_modules'] },
    ...Object.keys(packagesPaths).map(name => ({
      cmd: 'linkAsModule',
      args: [packagesPaths[name], resolve('/foo/bar', 'node_modules', name)],
    })),
  ]
  testAction(
    linkAsModule,
    { config: { packagesPaths, path: '/foo' } },
    { linkAsModule: linkResults, commands },
    done
  )
})

it('should skip link as modules if common path contains node_modules', done => {
  jest.setTimeout(4000)
  testAction(linkAsModule, {}, { linkAsModule: {}, commands: [] }, done)
})

it('should not link as modules inside part of name', done => {
  jest.setTimeout(4000)
  const packagesPaths = {
    '@repo-cooker-test/commis': '/foo/bar/@repo-cooker-test/commis',
    '@repo-cooker-test/entremetier': '/foo/bar/@repo-cooker-test/entremetier',
  }
  const linkResults = {
    '@repo-cooker-test/commis': 'mock command',
    '@repo-cooker-test/entremetier': 'mock command',
  }

  const commands = [
    // /foo/bar, not /foo/bar/@repo-cooker-test
    { cmd: 'mkdirSync', args: ['/foo/bar/node_modules'] },
    ...Object.keys(packagesPaths).map(name => ({
      cmd: 'linkAsModule',
      args: [packagesPaths[name], resolve('/foo/bar', 'node_modules', name)],
    })),
  ]
  testAction(
    linkAsModule,
    { config: { packagesPaths, path: '/foo' } },
    { linkAsModule: linkResults, commands },
    done
  )
})
