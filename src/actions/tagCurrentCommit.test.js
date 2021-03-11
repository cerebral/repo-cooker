/* eslint-env mocha */
import simple from 'simple-mock'
import { testAction } from 'test-utils'
import { tagCurrentCommit } from './'

const date = '2017-07-09T19:06:31.620Z'

describe('tagCurrentCommit', () => {
  before(() => {
    simple.mock(Date.prototype, 'toISOString').returnWith(date)
  })
  after(() => {
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
