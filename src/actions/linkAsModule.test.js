/* eslint-env mocha */
import { config, testAction } from 'test-utils'

import { linkAsModule } from './'
import { resolve } from '../helpers/path'

it('should link as modules', function(done) {
  this.timeout(4000)
  const linkResults = {
    '@repo-cooker-test/commis': 'mock command',
    '@repo-cooker-test/entremetier': 'mock command',
    '@repo-cooker-test/executive-chef': 'mock command',
    '@repo-cooker-test/pastry-chef': 'mock command',
    '@repo-cooker-test/poissonier': 'mock command',
    '@repo-cooker-test/sous-chef': 'mock command',
    'repo-cooker-test': 'mock command',
  }

  const rootBin = resolve(config.path, 'node_modules', '.bin')
  const commands = Object.keys(config.packagesPaths)
    .map(name => ({ name, path: config.packagesPaths[name] }))
    .map(({ name, path }) => ({
      cmd: 'linkAsModule',
      args: [path, resolve(config.path, 'node_modules', name)],
    }))
  testAction(linkAsModule, {}, { linkAsModule: linkResults, commands }, done)
})
