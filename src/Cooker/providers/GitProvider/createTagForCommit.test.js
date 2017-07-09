/* eslint-env mocha */
import nodegit from 'nodegit'
import { config } from 'test-utils'
import assert from 'test-utils/assert'
import { createTagForCommit } from './createTagForCommit'

const name = 'hello-test'

describe('createTagForCommit', () => {
  after(() => {
    nodegit.Repository
      .open(config.path)
      .then(repo => nodegit.Tag.delete(repo, name))
      .catch(x => console.log(x))
  })

  it('should create git tag', done => {
    createTagForCommit(config.path, name)
      .then(() => {
        nodegit.Repository
          .open(config.path)
          .then(repo => nodegit.Tag.list(repo))
          .then(list => {
            assert.equal(0, list.indexOf(name), done)
          })
      })
      .catch(done)
  })
})