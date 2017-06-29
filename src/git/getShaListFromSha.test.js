/* eslint-env mocha */
import assert from 'assert'
import { getShaListFromSha } from './getShaListFromSha'

it('should return list up to master', function(done) {
  this.timeout(10000)
  const sha = 'd579c35db272ed0b93c295b6f4c90a1df89899f7'
  getShaListFromSha('../../test-repo', sha).then(list => {
    console.log(list)
    assert.equal(list, [])
    done()
  })
})
