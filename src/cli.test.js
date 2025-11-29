import assert from 'test-utils/assert'
import { execCli } from 'test-utils'
const TIMEOUT = 30000

it(
  'should run script in custom repo-cooker-path',
  (done) => {
    execCli('babel-node', ['../../dist/cli.js', 'dummy', 'one', 'two'])
      .then((result) => {
        assert.match(result.output, /dummy script: \["one","two"\]/, done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)

it(
  'should run npm command',
  (done) => {
    execCli('babel-node', ['../../dist/cli.js', 'other-script'])
      .then((result) => {
        assert.match(result.output, 'Other Script OK', done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)

it(
  'should run builtin named release',
  (done) => {
    execCli('babel-node', [
      '../../dist/cli.js',
      '--release=default',
      '--dry-run',
    ])
      .then((result) => {
        assert.match(result.output, 'default release: DRY RUN OK', done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)

it(
  'should run builtin default release',
  (done) => {
    execCli('babel-node', ['../../dist/cli.js', '--release', '--dry-run'])
      .then((result) => {
        assert.match(result.output, 'default release: DRY RUN OK', done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)

it(
  'should print release notes',
  (done) => {
    execCli('babel-node', [
      '../../dist/cli.js',
      '--release',
      '--dry-run',
      '--print-release',
    ])
      .then((result) => {
        assert.match(result.output, '## Updated packages', done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)

it(
  'should check dependencies',
  (done) => {
    execCli('babel-node', ['../../dist/cli.js', '--check-dependencies'])
      .then((result) => {
        assert.match(result.output, 'check dependencies: SUCCESS !!', done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)

it(
  'should fix dependencies',
  (done) => {
    execCli('babel-node', ['../../dist/cli.js', '--fix-dependencies'])
      .then((result) => {
        assert.match(result.output, 'check dependencies: SUCCESS !!', done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)

it(
  'should link bin directory',
  (done) => {
    execCli('babel-node', ['../../dist/cli.js', '--link'])
      .then((result) => {
        assert.match(result.output, 'link: SUCCESS !!', done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)

it(
  'should run build scripts respecting dependencies',
  (done) => {
    execCli('babel-node', ['../../dist/cli.js', '--build'])
      .then((result) => {
        assert.match(result.output, 'build: SUCCESS !!', done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)

it(
  'should run build scripts without parallel',
  (done) => {
    execCli('babel-node', ['../../dist/cli.js', '--build', '--no-parallel'])
      .then((result) => {
        assert.match(result.output, 'PARALLEL: OFF', () => {})
        assert.match(result.output, 'build: SUCCESS !!', done)
      })
      .catch((err) => {
        assert.equal(err, 'should run without throwing', done)
      })
  },
  TIMEOUT
)
