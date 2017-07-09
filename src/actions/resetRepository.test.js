/* eslint-env mocha */
import { config, testAction } from 'test-utils'
import { resetRepository } from './'

it('should reset repository', done => {
  const commands = [
    {
      cmd: 'resetRepository',
      args: [config.path, 'HEAD', 'hard'],
    },
  ]
  testAction(resetRepository, {}, { commands }, done)
})
