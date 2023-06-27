/* eslint-env jest */
import { tagCurrentCommit } from './'
import { testAction } from 'test-utils'

const date = '2017-07-09T19:06:31.620Z'

describe('tagCurrentCommit', () => {
  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(date)
  })
  afterEach(() => {
    jest.restoreAllMocks()
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
