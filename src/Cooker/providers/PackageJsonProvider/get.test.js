/* eslint-env mocha */
import assert from 'test-utils/assert'
import { get } from './get'
import { readFileSync } from 'fs'
import { join } from 'path'
import { config } from 'test-utils'

it('should get package info', function(done) {
  const getInfo = get(config)

  const commisInfo = JSON.parse(
    readFileSync(
      join(
        config.path,
        'packages/node_modules/@repo-cooker-test/commis/package.json'
      )
    )
  )
  getInfo('@repo-cooker-test/commis').then(info => {
    assert.deepEqual(info, commisInfo, done)
  })
})
