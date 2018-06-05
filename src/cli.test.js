/* eslint-env mocha */
import { execCli } from 'test-utils'
import assert from 'test-utils/assert'

it('runs script in custom repo-cooker-path', function(done) {
  this.timeout(10000)
  execCli('babel-node', ['../../src/cli.js', 'dummy', 'one', 'two'])
    .then(result => {
      assert.match(result.output, /dummy script: \["one","two"\]/, done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('runs npm command', function(done) {
  this.timeout(10000)
  execCli('babel-node', ['../../src/cli.js', 'other-script'])
    .then(result => {
      // const lastLine = result.output.split('\n').slice(-2)[0]
      assert.match(result.output, 'Other Script OK', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})
