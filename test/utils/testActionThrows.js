/* eslint-env mocha */
import { config } from 'test-utils'
import assert from 'test-utils/assert'
import { Cooker } from 'repo-cooker'

export function testActionThrows(action, input, error, done) {
  let errorThrown = false
  const cooker = Cooker(config)
  cooker
    .run([() => input, action])
    .catch(err => {
      errorThrown = true
      assert.equal(err.message, error, done)
    })
    .then(() => {
      if (!errorThrown) {
        assert.equal('Did not throw.', `Action should throw '${error}'.`, done)
      }
    })
}
