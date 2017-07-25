/* eslint-env mocha */
import { config, runCommandMock } from 'test-utils'
import assert from 'test-utils/assert'
import { Cooker } from 'repo-cooker'

export function testAction(action, input, output, done, extraConfig = {}) {
  const dryRun = runCommandMock()
  const cooker = Cooker(Object.assign({}, config, { dryRun }, extraConfig))

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
      console.log('TEST ERROR', error)
    })
}
