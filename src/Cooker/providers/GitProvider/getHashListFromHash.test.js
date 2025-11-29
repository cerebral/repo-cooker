import assert from 'test-utils/assert'
import { commits } from 'test-utils/commits'
import { config } from 'test-utils'
import { getHashListFromHash } from './getHashListFromHash'

it('should return hash list up to hash', (done) => {
  const hash = commits[0].hash
  getHashListFromHash(config.path, hash).then((list) => {
    assert.deepEqual(
      list,
      commits.slice(1).map((commit) => commit.hash),
      done
    )
  })
})

it('should return full history for Big Bang pseudo-hash', (done) => {
  getHashListFromHash(config.path, 'Big Bang').then((list) => {
    assert.deepEqual(
      list,
      commits.map((c) => c.hash),
      done
    )
  })
})

it('should return empty list for last', (done) => {
  const hash = commits[commits.length - 1].hash
  getHashListFromHash(config.path, hash).then((list) => {
    assert.deepEqual(list, [], done)
  })
})

it('should throw an error on bad hash', (done) => {
  getHashListFromHash(config.path, 'badhash')
    .then((_list) => {
      assert.equal('RESOLVES', 'SHOULD NOT RESOLVE', done)
    })
    .catch((err) =>
      assert.equal(
        err.message,
        "Invalid hash value 'badhash' (not found in commit history).",
        done
      )
    )
})

it('should raise an error without hash argument', (done) => {
  getHashListFromHash(config.path).catch((err) => {
    assert.equal(
      err.message,
      `Missing hash parameter. For commits from origin of repository, use 'Big Bang' as hash.`,
      done
    )
  })
})
