/* eslint-env jest */
import { config, testAction } from 'test-utils'

import { restoreRepository } from '.'

it('should restore repository', done => {
  const commands = [
    {
      cmd: 'restoreRepository',
      args: [config.path],
    },
  ]
  testAction(restoreRepository, {}, { commands }, done)
})
