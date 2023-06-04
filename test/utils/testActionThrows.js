/* eslint-env jest */
import { config, runCommandMock } from 'test-utils'

import { Cooker } from 'repo-cooker'
import assert from 'test-utils/assert'

export function testActionThrows(action, input, error, done, extraConfig = {}) {
  const dryRun = runCommandMock()
  const cooker = Cooker(Object.assign({}, config, { dryRun }, extraConfig))

  let errorThrown = false
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
