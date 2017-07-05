/* eslint-env mocha */
import { config } from 'test-utils'
import assert from 'test-utils/assert'
import { Cooker } from 'repo-cooker'

export function testAction(action, input, output, done) {
  const cooker = Cooker(config)
  cooker.run([
    () => input,
    action,
    ({ props }) => {
      assert.deepEqual(
        Object.keys(output).reduce((acc, key) => {
          acc[key] = props[key]
          return acc
        }, {}),
        output,
        done
      )
    },
  ])
}
