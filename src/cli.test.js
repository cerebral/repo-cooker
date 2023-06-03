/* eslint-env jest */
import assert from 'test-utils/assert'
import { execCli } from 'test-utils'
const TIMEOUT = 20000

it('should run script in custom repo-cooker-path', done => {
  jest.setTimeout(TIMEOUT)
  execCli('babel-node', ['../../src/cli.js', 'dummy', 'one', 'two'])
    .then(result => {
      assert.match(result.output, /dummy script: \["one","two"\]/, done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should run npm command', done => {
  jest.setTimeout(TIMEOUT)
  execCli('babel-node', ['../../src/cli.js', 'other-script'])
    .then(result => {
      assert.match(result.output, 'Other Script OK', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should run builtin named release', done => {
  jest.setTimeout(TIMEOUT)
  execCli('babel-node', ['../../src/cli.js', '--release=default', '--dry-run'])
    .then(result => {
      assert.match(result.output, 'default release: DRY RUN OK', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should run builtin default release', done => {
  jest.setTimeout(TIMEOUT)
  execCli('babel-node', ['../../src/cli.js', '--release', '--dry-run'])
    .then(result => {
      assert.match(result.output, 'default release: DRY RUN OK', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should print release notes', done => {
  jest.setTimeout(TIMEOUT)
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

it('should check dependencies', done => {
  jest.setTimeout(TIMEOUT)
  execCli('babel-node', ['../../src/cli.js', '--check-dependencies'])
    .then(result => {
      assert.match(result.output, 'check dependencies: SUCCESS !!', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should fix dependencies', done => {
  jest.setTimeout(TIMEOUT)
  execCli('babel-node', ['../../src/cli.js', '--fix-dependencies'])
    .then(result => {
      assert.match(result.output, 'check dependencies: SUCCESS !!', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should link bin directory', done => {
  jest.setTimeout(TIMEOUT)
  execCli('babel-node', ['../../src/cli.js', '--link'])
    .then(result => {
      assert.match(result.output, 'link: SUCCESS !!', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should run build scripts respecting dependencies', done => {
  jest.setTimeout(TIMEOUT)
  execCli('babel-node', ['../../src/cli.js', '--build'])
    .then(result => {
      assert.match(result.output, 'build: SUCCESS !!', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})

it('should run build scripts without parallel', done => {
  jest.setTimeout(TIMEOUT)
  execCli('babel-node', ['../../src/cli.js', '--build', '--no-parallel'])
    .then(result => {
      assert.match(result.output, 'PARALLEL: OFF', () => {})
      assert.match(result.output, 'build: SUCCESS !!', done)
    })
    .catch(err => {
      assert.equal(err, 'should run without throwing', done)
    })
})
