/* eslint-env mocha */
import { options, runCommandMock } from 'test-utils'
import assert from 'test-utils/assert'
import { Cooker } from 'repo-cooker'

export function testAction(
  action,
  input,
  output,
  done,
  extraOptions = {},
  catcher = undefined
) {
  const dryRun = runCommandMock()
  const fullOptions = Object.assign({}, options, { dryRun }, extraOptions)
  const cooker = Cooker(fullOptions)

  cooker
    .run([
      () => Object.assign({}, input, { commands: dryRun.commands }),
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
    .catch(error => {
      if (catcher) {
        catcher(error)
      } else {
        console.log('TEST ERROR: throwing in signal.', error)
      }
    })
}
