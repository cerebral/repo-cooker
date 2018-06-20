import assert from 'test-utils/assert'
/* eslint-env mocha */
import { execCli } from 'test-utils'

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

it('should run builtin named release', function(done) {
  this.timeout(15000)
  execCli('babel-node', ['../../src/cli.js', '--release=default', '--dry-run'])
    .then(result => {
      assert.match(result.output, 'default release: DRY RUN OK', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should run builtin default release', function(done) {
  this.timeout(15000)
  execCli('babel-node', ['../../src/cli.js', '--release', '--dry-run'])
    .then(result => {
      assert.match(result.output, 'default release: DRY RUN OK', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should print release notes', function(done) {
  this.timeout(20000)
  execCli('babel-node', [
    '../../src/cli.js',
    '--release',
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

it('should check dependencies', function(done) {
  this.timeout(10000)
  execCli('babel-node', ['../../src/cli.js', '--check-dependencies'])
    .then(result => {
      assert.match(result.output, 'check dependencies: SUCCESS !!', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should fix dependencies', function(done) {
  this.timeout(10000)
  execCli('babel-node', ['../../src/cli.js', '--fix-dependencies'])
    .then(result => {
      assert.match(result.output, 'check dependencies: SUCCESS !!', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should link bin directory', function(done) {
  this.timeout(10000)
  execCli('babel-node', ['../../src/cli.js', '--link'])
    .then(result => {
      assert.match(result.output, 'link: SUCCESS !!', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})
