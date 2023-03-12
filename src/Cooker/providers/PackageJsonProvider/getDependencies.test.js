/* eslint-env mocha */
import assert from 'test-utils/assert'
import { getDependencies } from './getDependencies'

it('should get package dependencies', function (done) {
  const getDeps = getDependencies({
    packagesPaths: {
      tiger: './test/deps-fixtures/tiger',
    },
  })
  const tigerDeps = {
    dependencies: {
      foo: '^1.0.0',
    },
    devDependencies: {
      bar: '^2.5.0',
      bong: '^1.2.3',
    },
    peerDependencies: {
      baz: '^3.0.0',
    },
  }

  getDeps('tiger').then(deps => {
    assert.deepEqual(deps, tigerDeps, done)
  })
})
