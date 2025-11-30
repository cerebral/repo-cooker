import { options, runCommandMock } from 'test-utils'

import { Cooker } from 'repo-cooker'
import assert from 'test-utils/assert'

function normalizeOutput(output) {
  return Object.keys(output).reduce((acc, key) => {
    const value = output[key]
    // Sort commands array to handle non-deterministic async order
    if (key === 'commands' && Array.isArray(value)) {
      acc[key] = [...value].sort((a, b) =>
        (a.options?.cwd || '').localeCompare(b.options?.cwd || '')
      )
    } else {
      acc[key] = value
    }
    return acc
  }, {})
}

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
      ({ config }) => {
        if (input.config) {
          Object.assign(config, input.config)
        }
        return Object.assign({}, input, { commands: dryRun.commands })
      },
      action,
      ({ props }) => {
        assert.deepEqual(
          normalizeOutput(
            Object.keys(output).reduce((acc, key) => {
              acc[key] = props[key]
              return acc
            }, {})
          ),
          normalizeOutput(output),
          done
        )
      },
    ])
    .catch((error) => {
      if (catcher) {
        catcher(error)
      } else {
        console.log('TEST ERROR: throwing in signal.', error)
      }
    })
}
