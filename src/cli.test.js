/* eslint-env mocha */
import { execCli } from 'test-utils'
import assert from 'test-utils/assert'

it('should run script in custom repo-cooker-path', function(done) {
  this.timeout(15000)
  execCli('babel-node', ['../../src/cli.js', 'dummy', 'one', 'two'])
    .then(result => {
      assert.match(result.output, /dummy script: \["one","two"\]/, done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should run npm command', function(done) {
  this.timeout(15000)
  execCli('babel-node', ['../../src/cli.js', 'other-script'])
    .then(result => {
      assert.match(result.output, 'Other Script OK', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should run builtin simple release', function(done) {
  this.timeout(15000)
  execCli('babel-node', ['../../src/cli.js', '--release=simple', '--dry-run'])
    .then(result => {
      assert.match(result.output, 'simple release: DRY RUN OK', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should run builtin monorepo release', function(done) {
  this.timeout(15000)
  execCli('babel-node', ['../../src/cli.js', '--release=monorepo', '--dry-run'])
    .then(result => {
      assert.match(result.output, 'monorepo release: DRY RUN OK', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should print release notes', function(done) {
  this.timeout(10000)
  execCli('babel-node', [
    '../../src/cli.js',
    '--release=monorepo',
    '--dry-run',
    '--print-release',
  ])
    .then(result => {
      assert.match(result.output, '## Updated packages', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})
