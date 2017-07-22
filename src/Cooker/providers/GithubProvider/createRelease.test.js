/* eslint-env mocha */
import request from 'request'
import simple from 'simple-mock'
import { config } from 'test-utils'
import assert from 'test-utils/assert'
import { createRelease } from './createRelease'

describe('createRelease', () => {
  const release = {
    name: 'release_THIS_THAT',
    tag_name: 'release_THIS_THAT',
    body: 'Markdown description of release content.',
    created_at: new Date().toISOString(),
  }

  before(() => {
    simple.mock(request, 'post').callFn(({ url, form }, callback) => {
      const data = JSON.parse(form)
      callback(
        null,
        { statusCode: 201 },
        JSON.stringify({
          name: data.name,
          tag_name: data.tag_name,
          body: data.body,
          created_at: release.created_at,
        })
      )
    })
  })

  after(() => simple.restore())

  it('should publish release to github', function(done) {
    createRelease(config.path, release.name, release.body)
      .then(response => {
        assert.deepEqual(response, release, done)
      })
      .catch(done)
  })
})
