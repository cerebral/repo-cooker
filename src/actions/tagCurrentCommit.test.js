/* eslint-env jest */
import simple from 'simple-mock'
import { tagCurrentCommit } from './'
import { testAction } from 'test-utils'

const date = '2017-07-09T19:06:31.620Z'

describe('tagCurrentCommit', () => {
  beforeAll(() => {
    simple.mock(Date.prototype, 'toISOString').returnWith(date)
  })
  afterAll(() => {
    simple.restore()
  })

  const name = 'v2017-07-09_1906'
  const tag = { name, date }
  it('should tag current commit', done => {
    const commands = [
      {
        cmd: 'git',
        args: ['tag', '-a', name, '-m', '""'],
      },
    ]
    testAction(tagCurrentCommit, {}, { commands, tag }, done)
  })
})
