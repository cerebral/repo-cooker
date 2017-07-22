/* eslint-env mocha */
import assert from 'test-utils/assert'
import simple from 'simple-mock'
import { execCommand, logCommand } from './execCommand'

describe('logCommand', () => {
  const logs = []
  before(() => {
    simple.mock(console, 'log').callFn((...args) => logs.push(args))
  })

  after(() => simple.restore())

  it('should output commands to console', done => {
    logCommand('hello', ['a', 'b', 'c'], { some: 'option' }).then(() => {
      assert.deepEqual(
        logs,
        [
          [
            '\n\u001b[33mhello\u001b[0m\n    a\n    b\n    c\n    {"some":"option"}',
          ],
        ],
        done
      )
    })
  })
})

describe('execCommand', () => {
  it('should execute command', done => {
    execCommand('date', ['-r', '1234567890'], {}).then(out => {
      assert.equal(out, 'Sat Feb 14 00:31:30 CET 2009\n', done)
    })
  })
})
