/* eslint-env jest */
import { config, testAction } from 'test-utils'

import { link } from './'
import { resolve } from '../helpers/path'

it('should link bin directories', done => {
  jest.setTimeout(4000)
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
    .map(name => config.packagesPaths[name])
    .map(path => ({
      cmd: 'link',
      args: [rootBin, resolve(path, 'node_modules', '.bin')],
    }))
  testAction(link, {}, { link: linkResults, commands }, done)
})
