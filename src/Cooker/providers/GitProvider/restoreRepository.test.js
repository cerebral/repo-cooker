/* eslint-env jest */
import assert from 'test-utils/assert'
import { config } from 'test-utils'
import fs from 'fs'
import { join } from '../../../helpers/path'
import { restoreRepository } from './restoreRepository'

it('should restore all changed files in repo', done => {
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
        restoreRepository(config.path).then(() => {
          fs.readFile(path, 'utf8', (err, restoreContent) => {
            if (err) {
              throw new Error(err)
            }
            assert.equal(restoreContent, original, done)
          })
        })
      }
    )
  })
})
