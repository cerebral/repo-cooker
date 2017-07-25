/* eslint-env mocha */
import { config, runCommandMock } from 'test-utils'
import { tags } from 'test-utils/commits'
import assert from 'test-utils/assert'
import * as cook from './actions'
import { Cooker } from './'

it('cooks', done => {
  const dryRun = runCommandMock()
  const cooker = Cooker(Object.assign({}, config, { dryRun }))
  cooker.run([
    cook.getLatestReleaseHash,
    ({ props }) => {
      assert.equal(props.hash, tags[tags.length - 1].hash, done)
    },
  ])
})
