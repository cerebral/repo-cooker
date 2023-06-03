/* eslint-env jest */
import { config, runCommandMock } from 'test-utils'

import { Cooker } from '..'
import assert from 'test-utils/assert'
import { buildSequence } from './build'

it('should run build scripts respecting dependencies', done => {
  const dryRun = runCommandMock()
  const cooker = Cooker(Object.assign({}, config, { dryRun }))
  cooker.run([
    ...buildSequence,
    ({ props }) => {
      assert.deepEqual(
        props.build,
        {
          '@repo-cooker-test/entremetier': false,
          '@repo-cooker-test/executive-chef': false,
          '@repo-cooker-test/poissonier': false,
          '@repo-cooker-test/sous-chef': false,
          'repo-cooker-test': false,
          '@repo-cooker-test/commis': false,
          '@repo-cooker-test/pastry-chef': false,
        },
        done
      )
    },
  ])
})
