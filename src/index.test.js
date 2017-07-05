/* eslint-env mocha */
import { config } from 'test-utils'
import { tags } from 'test-utils/commits'
import assert from 'test-utils/assert'
import * as cook from './actions'
import { Cooker } from './'

it('cooks', done => {
  const cooker = Cooker(config)
  cooker.run([
    cook.getLatestReleaseHash,
    ({ props }) => {
      assert.equal(props.hash, tags[tags.length - 1], done)
    },
  ])
})
