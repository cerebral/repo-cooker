/* eslint-env mocha */
import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { getHashListFromHash } from './getHashListFromHash'

it('should return hash list up to master', function(done) {
  const hash = commits[0].hash
  getHashListFromHash('test/repo', hash).then(list => {
    assert.deepEqual(list, commits.slice(1).map(commit => commit.hash), done)
  })
})

it('should return full history for Big Bang pseudo-hash', function(done) {
  getHashListFromHash('test/repo', 'Big Bang').then(list => {
    assert.deepEqual(list, commits.map(c => c.hash), done)
  })
})

it('should return empty list for master', function(done) {
  const hash = commits[commits.length - 1].hash
  getHashListFromHash('test/repo', hash).then(list => {
    assert.deepEqual(list, [], done)
  })
})

it('should return an empty list for bad hash', function(done) {
  getHashListFromHash('test/repo', 'badhash').then(list => {
    assert.deepEqual(list, [], done)
  })
})

it('should raise an error without hash argument', function(done) {
  getHashListFromHash('test/repo').catch(err => {
    assert.equal(
      err.message,
      `Missing hash parameter. For commits from origin of repository, use 'Big Bang' as hash.`,
      done
    )
  })
})
