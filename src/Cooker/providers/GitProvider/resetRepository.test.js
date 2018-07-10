import assert from 'test-utils/assert'
import { config } from 'test-utils'
/* eslint-env mocha */
import fs from 'fs'
import { join } from '../../../helpers/path'
import { resetRepository } from './resetRepository'

it('should reset all changed files in repo', done => {
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
        resetRepository(config.path, 'hard', 'HEAD').then(() => {
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
