/* eslint-env mocha */
import assert from 'test-utils/assert'
import simple from 'simple-mock'
import { logCommand } from './execCommand'

describe('execCommand', () => {
  const logs = []
  before(() => {
    simple.mock(console, 'log').callFn((...args) => logs.push(args))
  })

  after(() => simple.restore())

  it('should output commands to console', done => {
    logCommand('hello', ['a', 'b', 'c'], { some: 'option' }).then(() => {
      assert.deepEqual(
        [['\nhello\n    a\n    b\n    c\n    {"some":"option"}\n']],
        logs,
        done
      )
    })
  })
})
