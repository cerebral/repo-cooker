/* eslint-env jest */
import { pushTagToRemote } from './'
import { testAction } from 'test-utils'

it('should reset repository', done => {
  const name = 'theTagName'
  const date = '2017-07-10T18:05:35.911Z'
  const commands = [
    {
      cmd: 'git',
      args: ['push', 'origin', name],
    },
  ]
  testAction(
    pushTagToRemote,
    {
      tag: { name, date },
    },
    { commands },
    done
  )
})
