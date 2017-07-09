/* eslint-env mocha */
import fs from 'fs'
import { join } from 'path'
import { config } from 'test-utils'
import assert from 'test-utils/assert'
import { resetRepository } from './resetRepository'

it('reset all changed files in repo', function(done) {
  const path = join(config.path, 'README.md')
  fs.readFile(path, 'utf8', (err, original) => {
    if (err) {
      throw new Error(err)
    }
    fs.writeFile(
      path,
      original + '\n\nAnd some random stuff\n',
      'utf8',
      err => {
        if (err) {
          throw new Error(err)
        }
        resetRepository(config.path, 'HEAD', 'hard').then(() => {
          fs.readFile(path, 'utf8', (err, resetContent) => {
            if (err) {
              throw new Error(err)
            }
            assert.equal(resetContent, original, done)
          })
        })
      }
    )
  })
})
