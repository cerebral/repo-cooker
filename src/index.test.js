import * as cook from './actions'

import { config, runCommandMock } from 'test-utils'

import { Cooker } from './'
import assert from 'test-utils/assert'
import { tags } from 'test-utils/commits'

it('should cook', (done) => {
  const dryRun = runCommandMock()
  const cooker = Cooker(Object.assign({}, config, { dryRun }))
  cooker.run([
    cook.getLatestReleaseHash,
    ({ props }) => {
      assert.equal(props.hash, tags[tags.length - 1].hash, done)
    },
  ])
})
